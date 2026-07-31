const scenarios = require('./scenarios');
const { getVariation, formatValue } = require('./field-formatters');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const STACK_META = {
  html: { name: 'Plain HTML / jQuery', share: '20%', color: '#38bdf8', bg: '#0f172a', accent: '#0284c7' },
  react: { name: 'React / Next.js', share: '30%', color: '#38bdf8', bg: '#0b0f19', accent: '#0284c7' },
  angular: { name: 'Angular Reactive', share: '15%', color: '#dd1b16', bg: '#1e1b4b', accent: '#dd1b16' },
  vue: { name: 'Vue.js', share: '10%', color: '#41b883', bg: '#0d1117', accent: '#41b883' },
  php: { name: 'PHP Server-Rendered', share: '15%', color: '#818cf8', bg: '#111827', accent: '#4f46e5' },
  flask: { name: 'Flask / Python WTForms', share: '10%', color: '#34d399', bg: '#052e16', accent: '#10b981' }
};

function safeString(str) {
  return JSON.stringify(str);
}

function fieldValue(scenario, field) {
  // Do not pre-fill editable fields so the agent has to fill them from the profile.
  // Read-only fields (age, customer_id, branch_code) keep their computed values.
  if (field.readOnly) {
    const v = scenario.groundTruth[field.id];
    return v === null || v === undefined ? '' : String(v);
  }
  return '';
}

function adjustColor(hex, percent) {
  if (!hex || hex.length !== 7) return '#1e293b';
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function fieldInputHtml(field, scenario, attrs = {}) {
  const flags = scenario.stressFlags || {};
  const id = escapeHtml(attrs.id || field.id);
  const name = escapeHtml(attrs.name || field.id);
  const value = escapeHtml(fieldValue(scenario, field));
  const required = field.required ? ' required' : '';
  const options = field.options || [];
  const placeholder = field.placeholder ? ` placeholder="${escapeHtml(field.placeholder)}"` : '';

  if (field.isHoneypot && flags.hiddenHoneypotFields) {
    return `<input type="text" id="${id}" name="${name}" value="" style="position:absolute;left:-9999px;" tabindex="-1" autocomplete="off" />`;
  }

  const radioGroup = (cssClass) => `<div class="${cssClass}"><div class="radio-group">${options.map(opt => {
    const optVal = escapeHtml(opt);
    const checked = value === optVal ? ' checked' : '';
    return `<label><input type="radio" name="${name}" value="${optVal}"${checked}${required}> ${optVal}</label>`;
  }).join('')}</div></div>`;

  const checkboxGroup = (cssClass) => `<div class="${cssClass}"><div class="checkbox-group"><label><input type="checkbox" id="${id}" name="${name}"${required}> ${escapeHtml(field.label)}</label></div></div>`;

  switch (field.type) {
    case 'radio':
      return radioGroup('');
    case 'radio_inline':
      return radioGroup('radio-inline');
    case 'radio_cards':
      return radioGroup('radio-cards');
    case 'checkbox':
      return checkboxGroup('');
    case 'checkbox_inline':
      return checkboxGroup('checkbox-inline');
    case 'checkbox_cards':
      return checkboxGroup('checkbox-cards');
    case 'toggle':
      return `<kyc-toggle name="${name}" label="${escapeHtml(field.label)}"${required}></kyc-toggle>`;
    case 'select':
    case 'combobox':
      const placeholderOption = `<option value="" disabled ${value === '' ? 'selected' : ''}>${escapeHtml(field.placeholder || 'Select...')}</option>`;
      return `<select id="${id}" name="${name}"${required}>${placeholderOption}${options.map(opt => {
        const optVal = escapeHtml(opt);
        const selected = value === optVal ? ' selected' : '';
        return `<option value="${optVal}"${selected}>${optVal}</option>`;
      }).join('')}</select>`;
    case 'select_custom':
      return `<kyc-custom-select name="${name}" options="${escapeHtml(JSON.stringify(options))}" placeholder="${escapeHtml(field.placeholder || 'Select...')}"${required}></kyc-custom-select>`;
    case 'searchable_select':
      return `<kyc-custom-select searchable name="${name}" options="${escapeHtml(JSON.stringify(options))}" placeholder="${escapeHtml(field.placeholder || 'Search...')}"${required}></kyc-custom-select>`;
    case 'segmented':
      return `<div class="segmented-control">${options.map(opt => {
        const optVal = escapeHtml(opt);
        const checked = value === optVal ? ' checked' : '';
        return `<label><input type="radio" name="${name}" value="${optVal}"${checked}${required}> ${optVal}</label>`;
      }).join('')}</div>`;
    case 'date':
      return `<input type="date" id="${id}" name="${name}" value="${value}"${required} />`;
    case 'date_dmy_text':
    case 'date_mdy_text':
    case 'date_ymd_text':
      return `<input type="text" id="${id}" name="${name}" value="${value}"${placeholder}${required} pattern="^[0-9]{1,4}[\/-][0-9]{1,4}[\/-][0-9]{1,4}$" />`;
    case 'date_dmy_selects':
      return `<kyc-date-triple name="${name}"${required}></kyc-date-triple>`;
    case 'month_year':
      return `<input type="text" id="${id}" name="${name}" value="${value}"${placeholder}${required} pattern="^[0-9]{1,2}[\/-][0-9]{4}$" />`;
    case 'date_calendar':
      return `<kyc-date-calendar name="${name}" placeholder="${escapeHtml(field.placeholder || 'Pick a date...')}"${required}></kyc-date-calendar>`;
    case 'number':
      return `<input type="number" id="${id}" name="${name}" value="${value}"${required} />`;
    case 'email':
      return `<input type="email" id="${id}" name="${name}" value="${value}"${required} />`;
    case 'tel':
      return `<input type="tel" id="${id}" name="${name}" value="${value}"${required} />`;
    case 'file':
      return `<input type="file" id="${id}" name="${name}"${required} />`;
    case 'file_dropzone':
      return `<kyc-dropzone name="${name}" accept="${escapeHtml(field.accept || '')}" label="Drag & drop ${escapeHtml(field.label)} here or click to upload"${required}></kyc-dropzone>`;
    case 'file_multiple':
      return `<input type="file" id="${id}" name="${name}" multiple${field.accept ? ` accept="${escapeHtml(field.accept)}"` : ''}${required} />`;
    case 'file_camera':
      return `<label class="kyc-camera-btn"><input type="file" id="${id}" name="${name}" accept="image/*" capture="user" style="display:none;"${required}>📷 ${escapeHtml(field.label)}</label>`;
    case 'textarea':
      return `<textarea id="${id}" name="${name}"${required}>${value}</textarea>`;
    default:
      return `<input type="text" id="${id}" name="${name}" value="${value}"${placeholder}${required} />`;
  }
}

function fieldWrapperHtml(field, scenario, inputHtml, extraClasses = '') {
  if (field.isHoneypot && (scenario.stressFlags || {}).hiddenHoneypotFields) return inputHtml;
  return `<div class="form-group ${escapeHtml(extraClasses)}" data-field-id="${escapeHtml(field.id)}">
      <label for="${escapeHtml(field.id)}">${escapeHtml(field.label)}${field.required ? ' *' : ''}</label>
      ${inputHtml}
    </div>`;
}

function commonStyles(meta) {
  return `
    body { font-family: system-ui, sans-serif; background-color: ${meta.bg}; color: #f8fafc; padding: 20px; }
    .container { max-width: 950px; margin: 0 auto; background: ${adjustColor(meta.bg, 20)}; padding: 35px; border-radius: 14px; border: 1px solid ${meta.accent}; }
    h1 { color: ${meta.color}; border-bottom: 2px solid ${meta.accent}; padding-bottom: 12px; margin-top: 0; }
    .badge { display: inline-block; background: ${meta.accent}; color: white; padding: 5px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; margin-bottom: 20px; }
    .desc { color: #94a3b8; margin-bottom: 20px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; }
    .form-group { margin-bottom: 16px; }
    label { display: block; margin-bottom: 6px; font-weight: 600; color: #cbd5e1; font-size: 0.9rem; }
    input, select, textarea { width: 100%; padding: 11px; border-radius: 6px; border: 1px solid ${meta.accent}; background: ${meta.bg}; color: white; font-size: 0.95rem; box-sizing: border-box; }
    input:focus, select:focus { outline: none; border-color: ${meta.color}; box-shadow: 0 0 0 3px ${meta.color}33; }
    .radio-group, .checkbox-group { display: flex; gap: 15px; flex-wrap: wrap; margin-top: 5px; }
    .radio-group label, .checkbox-group label { font-weight: normal; display: flex; align-items: center; gap: 6px; }
    .btn-submit { background: linear-gradient(135deg, ${meta.accent}, ${meta.color}); color: white; border: none; padding: 14px 28px; font-size: 1.1rem; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 20px; }
    .result-box { margin-top: 25px; padding: 20px; background: #00000055; border-radius: 8px; border: 1px solid ${meta.accent}; display: none; }
    ${widgetStyles()}
  `;
}

function widgetStyles() {
  return `
    /* --- Variation widget shared styles --- */
    .radio-inline .radio-group, .checkbox-inline .checkbox-group { gap: 20px; }
    .radio-cards .radio-group, .checkbox-cards .checkbox-group { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; }
    .radio-cards .radio-group label, .checkbox-cards .checkbox-group label { border: 1px solid #475569; border-radius: 8px; padding: 12px; cursor: pointer; transition: all 0.15s; }
    .radio-cards .radio-group label:has(input:checked), .checkbox-cards .checkbox-group label:has(input:checked) { border-color: #38bdf8; background: #0ea5e933; }
    .segmented-control { display: flex; border: 1px solid #475569; border-radius: 8px; overflow: hidden; }
    .segmented-control label { flex: 1; margin: 0; padding: 10px; text-align: center; cursor: pointer; border-right: 1px solid #475569; font-weight: 500; }
    .segmented-control label:last-child { border-right: none; }
    .segmented-control input { position: absolute; opacity: 0; }
    .segmented-control label:has(input:checked) { background: #38bdf8; color: #0f172a; font-weight: bold; }
    .toggle-switch { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .toggle-slider { width: 44px; height: 24px; background: #475569; border-radius: 24px; position: relative; transition: 0.2s; }
    .toggle-slider::before { content: ''; position: absolute; width: 18px; height: 18px; left: 3px; top: 3px; background: white; border-radius: 50%; transition: 0.2s; }
    .toggle-switch input:checked + .toggle-slider { background: #38bdf8; }
    .toggle-switch input:checked + .toggle-slider::before { transform: translateX(20px); }
    kyc-custom-select { display: block; position: relative; }
    .kyc-select-trigger { width: 100%; padding: 11px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; cursor: pointer; text-align: left; display: flex; justify-content: space-between; align-items: center; }
    .kyc-select-options { position: absolute; top: 100%; left: 0; right: 0; background: #1e293b; border: 1px solid #475569; border-radius: 6px; margin-top: 4px; max-height: 240px; overflow-y: auto; z-index: 100; display: none; }
    .kyc-select-options.open { display: block; }
    .kyc-select-option { padding: 10px 12px; cursor: pointer; }
    .kyc-select-option:hover, .kyc-select-option.active { background: #334155; }
    .kyc-triple-select { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
    .kyc-calendar-input { width: 100%; padding: 11px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; cursor: pointer; }
    .kyc-calendar-popup { position: absolute; top: 100%; left: 0; background: #1e293b; border: 1px solid #475569; border-radius: 8px; padding: 12px; z-index: 100; display: none; min-width: 280px; }
    .kyc-calendar-popup.open { display: block; }
    .kyc-calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .kyc-calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center; }
    .kyc-calendar-day { padding: 6px; border-radius: 4px; cursor: pointer; }
    .kyc-calendar-day:hover { background: #334155; }
    .kyc-calendar-day.selected { background: #38bdf8; color: #0f172a; }
    .kyc-dropzone { border: 2px dashed #475569; border-radius: 8px; padding: 24px; text-align: center; cursor: pointer; transition: 0.2s; }
    .kyc-dropzone:hover, .kyc-dropzone.dragover { border-color: #38bdf8; background: #0ea5e91a; }
    .kyc-camera-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; cursor: pointer; }
    .kyc-camera-btn:hover { border-color: #38bdf8; }
    input[type="file"] { color: #94a3b8; }
  `;
}

function sharedWidgetScripts() {
  return `<script>
(function() {
  if (window.__KYC_WIDGETS_INIT__) return;
  window.__KYC_WIDGETS_INIT__ = true;

  window.collectWidgetValues = function(root) {
    const data = {};
    root.querySelectorAll('kyc-custom-select, kyc-date-triple, kyc-date-calendar, kyc-toggle, kyc-dropzone').forEach(el => {
      const input = el.querySelector('input[name]');
      if (input) {
        if (input.type === 'checkbox') data[input.name] = input.checked;
        else if (input.type === 'file') data[input.name] = input.files.length ? input.files[0].name : '';
        else data[input.name] = input.value;
      }
    });
    return data;
  };

  function dispatchInput(input) {
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  class KycCustomSelect extends HTMLElement {
    connectedCallback() {
      const name = this.getAttribute('name');
      this._options = JSON.parse(this.getAttribute('options') || '[]');
      const placeholder = this.getAttribute('placeholder') || 'Select...';
      const required = this.hasAttribute('required');
      const searchable = this.hasAttribute('searchable');
      this.innerHTML = '<input type="hidden" name="' + name + '"' + (required ? ' required' : '') + '><button type="button" class="kyc-select-trigger"><span class="kyc-select-text">' + placeholder + '</span><span>▼</span></button><div class="kyc-select-options"></div>';
      const optsEl = this.querySelector('.kyc-select-options');
      if (searchable) {
        const searchBox = document.createElement('input');
        searchBox.className = 'kyc-select-search';
        searchBox.placeholder = 'Type to filter...';
        searchBox.style.cssText = 'width:100%;padding:8px;border:none;border-bottom:1px solid #475569;background:#0f172a;color:white;box-sizing:border-box;';
        searchBox.addEventListener('input', (e) => this.filterOptions(e.target.value));
        searchBox.addEventListener('click', (e) => e.stopPropagation());
        optsEl.appendChild(searchBox);
      }
      this._options.forEach((opt) => {
        const div = document.createElement('div');
        div.className = 'kyc-select-option';
        div.textContent = opt;
        div.dataset.value = opt;
        div.addEventListener('click', () => this.select(opt));
        optsEl.appendChild(div);
      });
      this.querySelector('.kyc-select-trigger').addEventListener('click', (e) => { e.preventDefault(); this.toggle(); });
      document.addEventListener('click', (e) => { if (!this.contains(e.target)) optsEl.classList.remove('open'); });
    }
    filterOptions(query) {
      const q = (query || '').toLowerCase();
      this.querySelectorAll('.kyc-select-option').forEach(opt => {
        opt.style.display = opt.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    }
    select(value) {
      const input = this.querySelector('input');
      input.value = value;
      this.querySelector('.kyc-select-text').textContent = value;
      this.querySelector('.kyc-select-options').classList.remove('open');
      dispatchInput(input);
    }
    toggle() {
      this.querySelector('.kyc-select-options').classList.toggle('open');
    }
  }

  class KycDateTriple extends HTMLElement {
    connectedCallback() {
      const name = this.getAttribute('name');
      const required = this.hasAttribute('required');
      const daySel = '<select class="kyc-day"><option value="">Day</option>' + Array.from({length:31},(_,i)=>'<option value="'+(i+1)+'">'+(i+1)+'</option>').join('') + '</select>';
      const monthSel = '<select class="kyc-month"><option value="">Month</option>' + Array.from({length:12},(_,i)=>'<option value="'+(i+1)+'">'+(i+1)+'</option>').join('') + '</select>';
      const yearSel = '<select class="kyc-year"><option value="">Year</option>' + Array.from({length:100},(_,i)=>'<option value="'+(1925+i)+'">'+(1925+i)+'</option>').join('') + '</select>';
      this.innerHTML = '<input type="hidden" name="' + name + '"' + (required ? ' required' : '') + '><div class="kyc-triple-select">' + daySel + monthSel + yearSel + '</div>';
      const update = () => {
        const d = this.querySelector('.kyc-day').value;
        const m = this.querySelector('.kyc-month').value;
        const y = this.querySelector('.kyc-year').value;
        const input = this.querySelector('input');
        if (d && m && y) {
          input.value = String(d).padStart(2,'0') + '/' + String(m).padStart(2,'0') + '/' + y;
        } else input.value = '';
        dispatchInput(input);
      };
      this.querySelectorAll('select').forEach(s => s.addEventListener('change', update));
    }
  }

  class KycDateCalendar extends HTMLElement {
    connectedCallback() {
      const name = this.getAttribute('name');
      const required = this.hasAttribute('required');
      const placeholder = this.getAttribute('placeholder') || 'Pick a date...';
      this.innerHTML = '<input type="hidden" name="' + name + '"' + (required ? ' required' : '') + '><input type="text" readonly class="kyc-calendar-input" placeholder="' + placeholder + '"><div class="kyc-calendar-popup"></div>';
      this.viewDate = new Date();
      this.selectedDate = null;
      this.input = this.querySelector('input[type="hidden"]');
      this.display = this.querySelector('.kyc-calendar-input');
      this.popup = this.querySelector('.kyc-calendar-popup');
      this.display.addEventListener('click', () => { this.render(); this.popup.classList.toggle('open'); });
      document.addEventListener('click', (e) => { if (!this.contains(e.target)) this.popup.classList.remove('open'); });
    }
    render() {
      const y = this.viewDate.getFullYear();
      const m = this.viewDate.getMonth();
      const firstDay = new Date(y, m, 1).getDay();
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      let html = '<div class="kyc-calendar-header"><button type="button" class="kyc-cal-prev">‹</button><span>' + (m+1) + '/' + y + '</span><button type="button" class="kyc-cal-next">›</button></div>';
      html += '<div class="kyc-calendar-grid">' + ['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => '<div style="font-weight:bold;">' + d + '</div>').join('') + '</div>';
      const grid = document.createElement('div'); grid.className = 'kyc-calendar-grid';
      for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));
      for (let d = 1; d <= daysInMonth; d++) {
        const cell = document.createElement('div');
        cell.className = 'kyc-calendar-day';
        cell.textContent = d;
        if (this.selectedDate && this.selectedDate.getDate() === d && this.selectedDate.getMonth() === m && this.selectedDate.getFullYear() === y) cell.classList.add('selected');
        cell.addEventListener('click', () => { this.pick(d); });
        grid.appendChild(cell);
      }
      this.popup.innerHTML = html;
      this.popup.appendChild(grid);
      this.popup.querySelector('.kyc-cal-prev').addEventListener('click', (e) => { e.stopPropagation(); this.viewDate.setMonth(m - 1); this.render(); });
      this.popup.querySelector('.kyc-cal-next').addEventListener('click', (e) => { e.stopPropagation(); this.viewDate.setMonth(m + 1); this.render(); });
    }
    pick(day) {
      const y = this.viewDate.getFullYear();
      const m = this.viewDate.getMonth();
      this.selectedDate = new Date(y, m, day);
      this.input.value = String(day).padStart(2,'0') + '/' + String(m+1).padStart(2,'0') + '/' + y;
      this.display.value = this.input.value;
      this.popup.classList.remove('open');
      dispatchInput(this.input);
    }
  }

  class KycToggle extends HTMLElement {
    connectedCallback() {
      const name = this.getAttribute('name');
      const label = this.getAttribute('label') || '';
      const required = this.hasAttribute('required');
      this.innerHTML = '<label class="toggle-switch"><input type="checkbox" name="' + name + '"' + (required ? ' required' : '') + '><span class="toggle-slider"></span><span>' + label + '</span></label>';
    }
  }

  class KycDropzone extends HTMLElement {
    connectedCallback() {
      const name = this.getAttribute('name');
      const accept = this.getAttribute('accept') || '';
      const label = this.getAttribute('label') || 'Drag & drop files here or click to upload';
      this.innerHTML = '<input type="file" name="' + name + '" style="display:none;" ' + (accept ? 'accept="' + accept + '"' : '') + '><div class="kyc-dropzone">' + label + '</div>';
      const input = this.querySelector('input');
      const zone = this.querySelector('.kyc-dropzone');
      zone.addEventListener('click', () => input.click());
      zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
      zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('dragover'); if (e.dataTransfer.files.length) input.files = e.dataTransfer.files; dispatchInput(input); });
      input.addEventListener('change', () => { zone.textContent = input.files.length ? input.files[0].name : label; dispatchInput(input); });
    }
  }

  customElements.define('kyc-custom-select', KycCustomSelect);
  customElements.define('kyc-date-triple', KycDateTriple);
  customElements.define('kyc-date-calendar', KycDateCalendar);
  customElements.define('kyc-toggle', KycToggle);
  customElements.define('kyc-dropzone', KycDropzone);
})();
</script>`;
}

function commonFakeButtons(flags) {
  if (!flags.fakeSubmitButtons) return '';
  return Array.from({ length: flags.fakeButtonCount || 2 }).map((_, i) =>
    `<button type="button" class="btn-submit fake-submit" style="background:#7f1d1d;margin-bottom:10px;">Submit Application ${i + 1}</button>`
  ).join('\n      ');
}

function commonDelayScript(flags) {
  return flags.networkDelayMs ? `<script>window.__KYC_DELAY_MS__ = ${flags.networkDelayMs};</script>` : '';
}

function prepareFields(scenario) {
  const flags = scenario.stressFlags || {};
  let fields = [...scenario.fields];
  if (flags.randomizedFieldOrder) shuffleArray(fields);
  return fields;
}

function renderHtmlStack(scenario, stack = 'html', apiBaseUrl = '') {
  const meta = STACK_META.html;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);
  const scenarioName = escapeHtml(scenario.name);
  const scenarioDesc = escapeHtml(scenario.description);

  const fieldHtml = fields.map(f => {
    const input = fieldInputHtml(f, scenario);
    if (flags.shadowDom && !f.isHoneypot) {
      return `<div class="form-group" data-field-id="${f.id}">
        <label>${f.label}${f.required ? ' *' : ''}</label>
        <kyc-field data-id="${f.id}">${input}</kyc-field>
      </div>`;
    }
    return fieldWrapperHtml(f, scenario, input);
  }).join('\n        ');

  const shadowScript = flags.shadowDom ? `
  <script>
    customElements.define('kyc-field', class extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = 'input, select { width: 100%; padding: 11px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; font-size: 0.95rem; box-sizing: border-box; }';
        shadow.appendChild(style);
        while (this.childNodes.length > 0) shadow.appendChild(this.childNodes[0]);
      }
    });
  </script>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="kyc-expected-profile" content="${escapeHtml(scenario.expectedProfile || 'A')}">
  <title>${scenarioName} — ${escapeHtml(meta.name)}</title>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <style>${commonStyles(meta)}</style>
  ${sharedWidgetScripts()}
  ${commonDelayScript(flags)}
</head>
<body>
  <div class="container">
    <span class="badge">${escapeHtml(meta.name)} (${escapeHtml(meta.share)} share)</span>
    <h1>${scenarioName}</h1>
    <p class="desc">${scenarioDesc}</p>
    <form id="kycForm" data-scenario="${escapeHtml(scenario.id)}" novalidate>
      <div class="grid-2">${fieldHtml}</div>
      ${commonFakeButtons(flags)}
      <button type="submit" class="btn-submit" id="realSubmit">Submit Form</button>
    </form>
    <div class="result-box" id="resultBox">
      <h3 style="color:${meta.color}; margin-top:0;">Score: <span id="scoreVal"></span>/100</h3>
      <pre id="resultJson" style="color:#a7f3d0; white-space:pre-wrap;"></pre>
    </div>
  </div>
  <script>
    function collectData(root) {
      root = root || document.getElementById('kycForm');
      const data = {};
      function walk(node) {
        if (node.shadowRoot) walk(node.shadowRoot);
        if (node.tagName === 'INPUT' || node.tagName === 'SELECT' || node.tagName === 'TEXTAREA') {
          const name = node.getAttribute('name');
          if (!name) return;
          if (node.type === 'checkbox') data[name] = node.checked;
          else if (node.type === 'radio') { if (node.checked) data[name] = node.value; }
          else data[name] = node.value;
        }
        Array.from(node.children).forEach(child => walk(child));
      }
      walk(root);
      return data;
    }
    $(function() {
      if (window.__KYC_DELAY_MS__) {
        $('#kycForm input, #kycForm select').prop('disabled', true);
        setTimeout(() => $('#kycForm input, #kycForm select').prop('disabled', false), window.__KYC_DELAY_MS__);
      }
      $('#kycForm').on('submit', function(e) {
        e.preventDefault();
        const data = collectData();
        $.ajax({ url: '${apiBaseUrl}/api/verify-submission', type: 'POST', contentType: 'application/json',
          data: JSON.stringify({ scenarioId: '${scenario.id}', variantId: '${scenario.variantId || ''}', data }),
          success: r => {
            $('#resultBox').show(); $('#scoreVal').text(r.report.score); $('#resultJson').text(JSON.stringify(r.report, null, 2));
            const agentId = new URLSearchParams(window.location.search).get('agentId') || 'anonymous-agent';
            $.ajax({ url: '${apiBaseUrl}/api/benchmark/run', type: 'POST', contentType: 'application/json',
              data: JSON.stringify({ agentId, agentName: agentId, scenarioId: '${scenario.id}', variantId: '${scenario.variantId || ''}', stack: '${stack}', data, report: r.report, metadata: { source: 'form-submission' } })
            });
          }
        });
      });
    });
  </script>
  ${shadowScript}
</body>
</html>`;
}

function renderPhpStack(scenario, stack = 'php', apiBaseUrl = '') {
  const meta = STACK_META.php;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);
  const scenarioName = escapeHtml(scenario.name);
  const scenarioDesc = escapeHtml(scenario.description);
  const fieldHtml = fields.map(f => fieldWrapperHtml(f, scenario, fieldInputHtml(f, scenario))).join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="kyc-expected-profile" content="${escapeHtml(scenario.expectedProfile || 'A')}">
  <title>${scenarioName} — ${escapeHtml(meta.name)}</title>
  <style>${commonStyles(meta)}
    fieldset { border: 1px solid ${meta.accent}; border-radius: 6px; padding: 18px; margin-bottom: 20px; }
    legend { color: ${meta.color}; font-weight: bold; padding: 0 10px; }
  </style>
  ${sharedWidgetScripts()}
  ${commonDelayScript(flags)}
</head>
<body>
  <div class="container">
    <span class="badge">${escapeHtml(meta.name)} (${escapeHtml(meta.share)} share)</span>
    <h1>${scenarioName}</h1>
    <p class="desc">${scenarioDesc}</p>
    <form id="phpKycForm" data-scenario="${escapeHtml(scenario.id)}" novalidate>
      <input type="hidden" name="csrf_token" value="csrf-token-${escapeHtml(scenario.id)}">
      <fieldset>
        <legend>KYC Fields</legend>
        <div class="grid-2">${fieldHtml}</div>
      </fieldset>
      ${commonFakeButtons(flags)}
      <button type="submit" class="btn-submit" id="realSubmit">Submit PHP Application</button>
    </form>
    <div class="result-box" id="resultBox">
      <h3 style="color:${meta.color}; margin-top:0;">Score: <span id="scoreVal"></span>/100</h3>
      <pre id="resultJson" style="color:#a7f3d0; white-space:pre-wrap;"></pre>
    </div>
  </div>
  <script>
    document.getElementById('phpKycForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const fd = new FormData(this);
      const data = {};
      fd.forEach((v, k) => data[k] = v);
      if (document.getElementById('esign_consent')) data.esign_consent = document.getElementById('esign_consent').checked;
      if (document.getElementById('terms_consent')) data.terms_consent = document.getElementById('terms_consent').checked;
      if (window.__KYC_DELAY_MS__) await new Promise(r => setTimeout(r, window.__KYC_DELAY_MS__));
      const res = await fetch('${apiBaseUrl}/api/verify-submission', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ scenarioId: '${scenario.id}', variantId: '${scenario.variantId || ''}', data }) });
      const result = await res.json();
      document.getElementById('resultBox').style.display = 'block';
      document.getElementById('scoreVal').textContent = result.report.score;
      document.getElementById('resultJson').textContent = JSON.stringify(result.report, null, 2);
      const agentId = new URLSearchParams(window.location.search).get('agentId') || 'anonymous-agent';
      await fetch('${apiBaseUrl}/api/benchmark/run', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ agentId, agentName: agentId, scenarioId: '${scenario.id}', variantId: '${scenario.variantId || ''}', stack: '${stack}', data, report: result.report, metadata: { source: 'form-submission' } }) });
    });
  </script>
</body>
</html>`;
}

function renderFlaskStack(scenario, stack = 'flask', apiBaseUrl = '') {
  const meta = STACK_META.flask;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);
  const scenarioName = escapeHtml(scenario.name);
  const scenarioDesc = escapeHtml(scenario.description);
  const fieldHtml = fields.map(f => fieldWrapperHtml(f, scenario, fieldInputHtml(f, scenario))).join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="kyc-expected-profile" content="${escapeHtml(scenario.expectedProfile || 'A')}">
  <title>${scenarioName} — ${escapeHtml(meta.name)}</title>
  <style>${commonStyles(meta)}
    .card-block { background: ${adjustColor(meta.bg, -10)}; border: 1px solid ${meta.accent}; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
    .card-heading { color: ${meta.color}; font-size: 1.1rem; border-bottom: 1px solid ${meta.accent}; padding-bottom: 8px; margin-top: 0; margin-bottom: 18px; }
  </style>
  ${sharedWidgetScripts()}
  ${commonDelayScript(flags)}
</head>
<body>
  <div class="container">
    <span class="badge">${escapeHtml(meta.name)} (${escapeHtml(meta.share)} share)</span>
    <h1>${scenarioName}</h1>
    <p class="desc">${scenarioDesc}</p>
    <form id="flaskForm" data-scenario="${escapeHtml(scenario.id)}" novalidate>
      <input type="hidden" name="csrf_token" value="csrf-token-flask-${escapeHtml(scenario.id)}">
      <div class="card-block">
        <h3 class="card-heading">WTFields Render Block</h3>
        <div class="grid-2">${fieldHtml}</div>
      </div>
      ${commonFakeButtons(flags)}
      <button type="submit" class="btn-submit" id="realSubmit">Submit Flask WTForms Application</button>
    </form>
    <div class="result-box" id="resultBox">
      <h3 style="color:${meta.color}; margin-top:0;">Score: <span id="scoreVal"></span>/100</h3>
      <pre id="resultJson" style="color:#a7f3d0; white-space:pre-wrap;"></pre>
    </div>
  </div>
  <script>
    document.getElementById('flaskForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const fd = new FormData(this);
      const data = {};
      fd.forEach((v, k) => data[k] = v);
      if (document.getElementById('esign_consent')) data.esign_consent = document.getElementById('esign_consent').checked;
      if (document.getElementById('terms_consent')) data.terms_consent = document.getElementById('terms_consent').checked;
      if (window.__KYC_DELAY_MS__) await new Promise(r => setTimeout(r, window.__KYC_DELAY_MS__));
      const res = await fetch('${apiBaseUrl}/api/verify-submission', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ scenarioId: '${scenario.id}', variantId: '${scenario.variantId || ''}', data }) });
      const result = await res.json();
      document.getElementById('resultBox').style.display = 'block';
      document.getElementById('scoreVal').textContent = result.report.score;
      document.getElementById('resultJson').textContent = JSON.stringify(result.report, null, 2);
      const agentId = new URLSearchParams(window.location.search).get('agentId') || 'anonymous-agent';
      await fetch('${apiBaseUrl}/api/benchmark/run', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ agentId, agentName: agentId, scenarioId: '${scenario.id}', variantId: '${scenario.variantId || ''}', stack: '${stack}', data, report: result.report, metadata: { source: 'form-submission' } }) });
    });
  </script>
</body>
</html>`;
}

function renderReactStack(scenario, stack = 'react', apiBaseUrl = '') {
  const meta = STACK_META.react;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);
  const scenarioName = escapeHtml(scenario.name);
  const scenarioDesc = escapeHtml(scenario.description);

  const initialState = {};
  scenario.fields.forEach(f => {
    if (f.readOnly) initialState[f.id] = scenario.groundTruth[f.id] !== undefined ? scenario.groundTruth[f.id] : '';
    else if (f.type === 'checkbox') initialState[f.id] = false;
    else initialState[f.id] = '';
  });

  const inputs = fields.map(f => {
    if (f.isHoneypot && flags.hiddenHoneypotFields) return `        {honeypotField(${safeString(f.id)})}`;
    const label = f.label;
    const req = f.required ? ' *' : '';
    let el;
    if (f.type === 'radio') {
      el = `<div className="radio-group">${(f.options || []).map(opt =>
        `<label key="${opt}"><input type="radio" name="${f.id}" value="${opt}" checked={formData.${f.id} === '${opt}'} onChange={handleChange} ${f.required ? 'required' : ''} /> ${opt}</label>`
      ).join('')}</div>`;
    } else if (f.type === 'checkbox') {
      el = `<label><input type="checkbox" name="${f.id}" checked={formData.${f.id}} onChange={handleChange} ${f.required ? 'required' : ''} /> ${label}</label>`;
    } else if (['select', 'combobox'].includes(f.type)) {
      el = `<select name="${f.id}" value={formData.${f.id}} onChange={handleChange} ${f.required ? 'required' : ''}><option value="" disabled>${f.placeholder || 'Select...'}</option>${(f.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
    } else if (['date', 'number', 'email', 'tel', 'text'].includes(f.type)) {
      const type = f.type === 'date' ? 'date' : f.type === 'number' ? 'number' : f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text';
      el = `<input type="${type}" name="${f.id}" value={formData.${f.id}} onChange={handleChange} ${f.placeholder ? `placeholder="${f.placeholder}"` : ''} ${f.required ? 'required' : ''} />`;
    } else if (f.type === 'textarea') {
      el = `<textarea name="${f.id}" value={formData.${f.id}} onChange={handleChange} ${f.required ? 'required' : ''} />`;
    } else if (f.type === 'file') {
      el = `<input type="file" name="${f.id}" onChange={handleChange} ${f.required ? 'required' : ''} />`;
    } else {
      // Variation types: render as framework-agnostic custom elements; submit handler merges their values.
      el = fieldInputHtml(f, scenario).replace(/class="/g, 'className="');
    }
    return `      <div className="form-group" data-field-id="${f.id}">
        <label>${label}${req}</label>
        ${el}
      </div>`;
  }).join('\n');

  const fakeBtns = commonFakeButtons(flags).replace(/class="/g, 'className="');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="kyc-expected-profile" content="${escapeHtml(scenario.expectedProfile || 'A')}">
  <title>${scenarioName} — ${escapeHtml(meta.name)}</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>${commonStyles(meta)}</style>
  ${sharedWidgetScripts()}
  ${commonDelayScript(flags)}
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect } = React;
    const initialState = ${safeString(initialState)};

    function honeypotField(name) {
      return <input type="text" name={name} style={{ position: 'absolute', left: '-9999px' }} tabIndex={-1} autoComplete="off" />;
    }

    function KycForm() {
      const [formData, setFormData] = useState(initialState);
      const [report, setReport] = useState(null);
      const [disabled, setDisabled] = useState(!!window.__KYC_DELAY_MS__);

      useEffect(() => {
        if (window.__KYC_DELAY_MS__) {
          const t = setTimeout(() => setDisabled(false), window.__KYC_DELAY_MS__);
          return () => clearTimeout(t);
        }
      }, []);

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const widgetValues = window.collectWidgetValues ? window.collectWidgetValues(e.target) : {};
        const payload = { ...formData, ...widgetValues };
        const res = await fetch('${apiBaseUrl}/api/verify-submission', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scenarioId: '${escapeHtml(scenario.id)}', variantId: '${escapeHtml(scenario.variantId || '')}', data: payload })
        });
        const result = await res.json();
        setReport(result.report);
        const agentId = new URLSearchParams(window.location.search).get('agentId') || 'anonymous-agent';
        await fetch('${apiBaseUrl}/api/benchmark/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agentId, agentName: agentId, scenarioId: '${escapeHtml(scenario.id)}', variantId: '${escapeHtml(scenario.variantId || '')}', stack: '${stack}', data: payload, report: result.report, metadata: { source: 'form-submission' } })
        });
      };

      return (
        <div className="container">
          <span className="badge">${escapeHtml(meta.name)} (${escapeHtml(meta.share)} share)</span>
          <h1>${scenarioName}</h1>
          <p className="desc">${scenarioDesc}</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid-2">
${inputs}
            </div>
            ${fakeBtns}
            <button type="submit" className="btn-submit" id="realSubmit" disabled={disabled}>Submit Form</button>
          </form>
          {report && (
            <div className="result-box">
              <h3 style={{ color: '${meta.color}', marginTop: 0 }}>Score: {report.score}/100</h3>
              <pre style={{ color: '#a7f3d0', whiteSpace: 'pre-wrap' }}>{JSON.stringify(report, null, 2)}</pre>
            </div>
          )}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<KycForm />);
  </script>
</body>
</html>`;
}

function renderAngularStack(scenario, stack = 'angular', apiBaseUrl = '') {
  const meta = STACK_META.angular;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);
  const scenarioName = escapeHtml(scenario.name);
  const scenarioDesc = escapeHtml(scenario.description);

  const initialState = {};
  scenario.fields.forEach(f => {
    if (f.readOnly) initialState[f.id] = scenario.groundTruth[f.id] !== undefined ? scenario.groundTruth[f.id] : '';
    else if (f.type === 'checkbox') initialState[f.id] = false;
    else initialState[f.id] = '';
  });

  const inputs = fields.map(f => {
    if (f.isHoneypot && flags.hiddenHoneypotFields) return `        <input type="text" name="${f.id}" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off" />`;
    const label = f.label;
    const req = f.required ? ' *' : '';
    let el;
    if (f.type === 'radio') {
      el = `<div class="radio-group">${(f.options || []).map(opt =>
        `<label><input type="radio" name="${f.id}" ng-model="form.${f.id}" value="${opt}" ${f.required ? 'required' : ''}> ${opt}</label>`
      ).join('')}</div>`;
    } else if (f.type === 'checkbox') {
      el = `<label><input type="checkbox" id="${f.id}" ng-model="form.${f.id}" ${f.required ? 'required' : ''}> ${label}</label>`;
    } else if (['select', 'combobox'].includes(f.type)) {
      el = `<select id="${f.id}" ng-model="form.${f.id}" ${f.required ? 'required' : ''}><option value="" disabled selected>${f.placeholder || 'Select...'}</option>${(f.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
    } else if (['date', 'number', 'email', 'tel', 'text'].includes(f.type)) {
      const type = f.type === 'date' ? 'date' : f.type === 'number' ? 'number' : f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text';
      el = `<input type="${type}" id="${f.id}" ng-model="form.${f.id}" ${f.placeholder ? `placeholder="${f.placeholder}"` : ''} ${f.required ? 'required' : ''} />`;
    } else if (f.type === 'textarea') {
      el = `<textarea id="${f.id}" ng-model="form.${f.id}" ${f.required ? 'required' : ''}></textarea>`;
    } else if (f.type === 'file') {
      el = `<input type="file" id="${f.id}" ng-model="form.${f.id}" ${f.required ? 'required' : ''} />`;
    } else {
      // Variation types: render as framework-agnostic custom elements; submit handler merges their values.
      el = fieldInputHtml(f, scenario);
    }
    return `      <div class="form-group" data-field-id="${f.id}">
        <label for="${f.id}">${label}${req}</label>
        ${el}
      </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="kyc-expected-profile" content="${escapeHtml(scenario.expectedProfile || 'A')}">
  <title>${scenarioName} — ${escapeHtml(meta.name)}</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <style>${commonStyles(meta)}</style>
  ${sharedWidgetScripts()}
  ${commonDelayScript(flags)}
</head>
<body ng-app="kycApp" ng-controller="KycController">
  <div class="container">
    <span class="badge">${escapeHtml(meta.name)} (${escapeHtml(meta.share)} share)</span>
    <h1>${scenarioName}</h1>
    <p class="desc">${scenarioDesc}</p>
    <form ng-submit="submitForm()" novalidate>
      <div class="grid-2">
${inputs}
      </div>
      ${commonFakeButtons(flags)}
      <button type="submit" class="btn-submit" id="realSubmit">Submit Angular Form</button>
    </form>
    <div ng-if="report" class="result-box">
      <h3 style="color:${meta.color}; margin-top:0;">Score: {{ report.score }}/100</h3>
      <pre style="color:#a7f3d0;">{{ report | json }}</pre>
    </div>
  </div>
  <script>
    angular.module('kycApp', [])
      .controller('KycController', ['$scope', '$http', function($scope, $http) {
        $scope.form = ${safeString(initialState)};
        $scope.submitForm = function() {
          const submit = () => {
            const widgetValues = window.collectWidgetValues ? window.collectWidgetValues(document.querySelector('form')) : {};
            const payload = Object.assign({}, $scope.form, widgetValues);
            if (payload.dob instanceof Date) payload.dob = payload.dob.toISOString().split('T')[0];
            const agentId = new URLSearchParams(window.location.search).get('agentId') || 'anonymous-agent';
            $http.post('${apiBaseUrl}/api/verify-submission', { scenarioId: '${escapeHtml(scenario.id)}', variantId: '${escapeHtml(scenario.variantId || '')}', data: payload })
              .then(r => {
                $scope.report = r.data.report;
                return $http.post('${apiBaseUrl}/api/benchmark/run', { agentId, agentName: agentId, scenarioId: '${scenario.id}', variantId: '${scenario.variantId || ''}', stack: '${stack}', data: payload, report: r.data.report, metadata: { source: 'form-submission' } });
              });
          };
          if (window.__KYC_DELAY_MS__) setTimeout(submit, window.__KYC_DELAY_MS__);
          else submit();
        };
      }]);
  </script>
</body>
</html>`;
}

function renderVueStack(scenario, stack = 'vue', apiBaseUrl = '') {
  const meta = STACK_META.vue;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);
  const scenarioName = escapeHtml(scenario.name);
  const scenarioDesc = escapeHtml(scenario.description);

  const initialState = {};
  scenario.fields.forEach(f => {
    if (f.readOnly) initialState[f.id] = scenario.groundTruth[f.id] !== undefined ? scenario.groundTruth[f.id] : '';
    else if (f.type === 'checkbox') initialState[f.id] = false;
    else initialState[f.id] = '';
  });

  const inputs = fields.map(f => {
    if (f.isHoneypot && flags.hiddenHoneypotFields) return `        <input type="text" name="${f.id}" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off" />`;
    const label = f.label;
    const req = f.required ? ' *' : '';
    let el;
    if (f.type === 'radio') {
      el = `<div class="radio-group">${(f.options || []).map(opt =>
        `<label><input type="radio" :name="'${f.id}'" v-model="form.${f.id}" value="${opt}" ${f.required ? 'required' : ''}> ${opt}</label>`
      ).join('')}</div>`;
    } else if (f.type === 'checkbox') {
      el = `<label><input type="checkbox" id="${f.id}" v-model="form.${f.id}" ${f.required ? 'required' : ''}> ${label}</label>`;
    } else if (['select', 'combobox'].includes(f.type)) {
      el = `<select id="${f.id}" v-model="form.${f.id}" ${f.required ? 'required' : ''}><option value="" disabled>${f.placeholder || 'Select...'}</option>${(f.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
    } else if (['date', 'number', 'email', 'tel', 'text'].includes(f.type)) {
      const type = f.type === 'date' ? 'date' : f.type === 'number' ? 'number' : f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text';
      el = `<input type="${type}" id="${f.id}" v-model="form.${f.id}" ${f.placeholder ? `placeholder="${f.placeholder}"` : ''} ${f.required ? 'required' : ''} />`;
    } else if (f.type === 'textarea') {
      el = `<textarea id="${f.id}" v-model="form.${f.id}" ${f.required ? 'required' : ''}></textarea>`;
    } else if (f.type === 'file') {
      el = `<input type="file" id="${f.id}" v-model="form.${f.id}" ${f.required ? 'required' : ''} />`;
    } else {
      // Variation types: render as framework-agnostic custom elements; submit handler merges their values.
      el = fieldInputHtml(f, scenario);
    }
    return `      <div class="form-group" data-field-id="${f.id}">
        <label for="${f.id}">${label}${req}</label>
        ${el}
      </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="kyc-expected-profile" content="${escapeHtml(scenario.expectedProfile || 'A')}">
  <title>${scenarioName} — ${escapeHtml(meta.name)}</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>${commonStyles(meta)}</style>
  ${sharedWidgetScripts()}
  ${commonDelayScript(flags)}
</head>
<body>
  <div id="app" class="container">
    <span class="badge">${escapeHtml(meta.name)} (${escapeHtml(meta.share)} share)</span>
    <h1>${scenarioName}</h1>
    <p class="desc">${scenarioDesc}</p>
    <form @submit.prevent="submitForm" novalidate>
      <div class="grid-2">
${inputs}
      </div>
      ${commonFakeButtons(flags)}
      <button type="submit" class="btn-submit" id="realSubmit" :disabled="disabled">Submit Vue Form</button>
    </form>
    <div v-if="report" class="result-box">
      <h3 style="color:${meta.color}; margin-top:0;">Vue Score: {{ report.score }}/100</h3>
      <pre style="color:#a7f3d0;">{{ JSON.stringify(report, null, 2) }}</pre>
    </div>
  </div>
  <script>
    const { createApp, ref } = Vue;
    createApp({
      setup() {
        const form = ref(${safeString(initialState)});
        const report = ref(null);
        const disabled = ref(!!window.__KYC_DELAY_MS__);
        if (window.__KYC_DELAY_MS__) setTimeout(() => disabled.value = false, window.__KYC_DELAY_MS__);
        const submitForm = async () => {
          const formEl = document.getElementById('app').querySelector('form');
          const widgetValues = window.collectWidgetValues ? window.collectWidgetValues(formEl) : {};
          const payload = { ...form.value, ...widgetValues };
          const res = await fetch('${apiBaseUrl}/api/verify-submission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scenarioId: '${escapeHtml(scenario.id)}', variantId: '${escapeHtml(scenario.variantId || '')}', data: payload })
          });
          const data = await res.json();
          report.value = data.report;
          const agentId = new URLSearchParams(window.location.search).get('agentId') || 'anonymous-agent';
          await fetch('${apiBaseUrl}/api/benchmark/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ agentId, agentName: agentId, scenarioId: '${escapeHtml(scenario.id)}', variantId: '${escapeHtml(scenario.variantId || '')}', stack: '${stack}', data: payload, report: data.report, metadata: { source: 'form-submission' } })
          });
        };
        return { form, report, submitForm, disabled };
      }
    }).mount('#app');
  </script>
</body>
</html>`;
}

function renderStackForm(scenario, stack, apiBaseUrl = '') {
  switch (stack) {
    case 'html': return renderHtmlStack(scenario, stack, apiBaseUrl);
    case 'react': return renderReactStack(scenario, stack, apiBaseUrl);
    case 'angular': return renderAngularStack(scenario, stack, apiBaseUrl);
    case 'vue': return renderVueStack(scenario, stack, apiBaseUrl);
    case 'php': return renderPhpStack(scenario, stack, apiBaseUrl);
    case 'flask': return renderFlaskStack(scenario, stack, apiBaseUrl);
    default: return renderHtmlStack(scenario, stack, apiBaseUrl);
  }
}

module.exports = { renderStackForm, STACK_META };
