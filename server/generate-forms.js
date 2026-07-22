const fs = require('fs');
const path = require('path');
const scenarios = require('./scenarios');
const { renderStackForm, STACK_META } = require('./form-renderers');

const STACKS = ['html', 'react', 'angular', 'vue', 'php', 'flask'];

function safeString(str) {
  return JSON.stringify(str);
}

function fieldValue(scenario, fieldId) {
  const v = scenario.groundTruth[fieldId];
  return v === null || v === undefined ? '' : String(v);
}

function fieldInputHtml(field, scenario, attrs = {}) {
  const flags = scenario.stressFlags || {};
  const id = attrs.id || field.id;
  const name = attrs.name || field.id;
  const value = fieldValue(scenario, field.id);
  const required = field.required ? ' required' : '';
  const options = field.options || [];
  const placeholder = field.placeholder ? ` placeholder="${field.placeholder}"` : '';

  if (field.isHoneypot && flags.hiddenHoneypotFields) {
    return `<input type="text" id="${id}" name="${name}" value="" style="position:absolute;left:-9999px;" tabindex="-1" autocomplete="off" />`;
  }

  switch (field.type) {
    case 'radio':
      return `<div class="radio-group">${options.map(opt => {
        const checked = value === opt ? ' checked' : '';
        return `<label><input type="radio" name="${name}" value="${opt}"${checked}${required}> ${opt}</label>`;
      }).join('')}</div>`;
    case 'checkbox':
      const checked = scenario.groundTruth[field.id] === true || value.toLowerCase() === 'true' ? ' checked' : '';
      return `<label><input type="checkbox" id="${id}" name="${name}"${checked}${required}> ${field.label}</label>`;
    case 'select':
    case 'combobox':
    case 'searchable_select':
      return `<select id="${id}" name="${name}"${required}>${options.map(opt => {
        const selected = value === opt ? ' selected' : '';
        return `<option value="${opt}"${selected}>${opt}</option>`;
      }).join('')}</select>`;
    case 'date':
      return `<input type="date" id="${id}" name="${name}" value="${value}"${required} />`;
    case 'number':
      return `<input type="number" id="${id}" name="${name}" value="${value}"${required} />`;
    case 'email':
      return `<input type="email" id="${id}" name="${name}" value="${value}"${required} />`;
    case 'tel':
      return `<input type="tel" id="${id}" name="${name}" value="${value}"${required} />`;
    case 'file':
      return `<input type="file" id="${id}" name="${name}"${required} />`;
    case 'textarea':
      return `<textarea id="${id}" name="${name}"${required}>${value}</textarea>`;
    default:
      return `<input type="text" id="${id}" name="${name}" value="${value}"${placeholder}${required} />`;
  }
}

function fieldWrapperHtml(field, scenario, inputHtml, extraClasses = '') {
  if (field.isHoneypot && (scenario.stressFlags || {}).hiddenHoneypotFields) return inputHtml;
  return `<div class="form-group ${extraClasses}" data-field-id="${field.id}">
      <label for="${field.id}">${field.label}${field.required ? ' *' : ''}</label>
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
  `;
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

function renderHtmlStack(scenario) {
  const meta = STACK_META.html;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);
  const fieldHtml = fields.map(f => fieldWrapperHtml(f, scenario, fieldInputHtml(f, scenario))).join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${scenario.name} — ${meta.name}</title>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <style>${commonStyles(meta)}</style>
  ${commonDelayScript(flags)}
</head>
<body>
  <div class="container">
    <span class="badge">${meta.name} (${meta.share} share)</span>
    <h1>${scenario.name}</h1>
    <p class="desc">${scenario.description}</p>
    <form id="kycForm" data-scenario="${scenario.id}">
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
    function collectData() {
      const data = {};
      $('#kycForm').find('input, select, textarea').each(function() {
        const $el = $(this), name = $el.attr('name');
        if (!name) return;
        if ($el.is(':checkbox')) data[name] = $el.is(':checked');
        else if ($el.is(':radio')) { if ($el.is(':checked')) data[name] = $el.val(); }
        else data[name] = $el.val();
      });
      return data;
    }
    $(function() {
      if (window.__KYC_DELAY_MS__) {
        $('#kycForm input, #kycForm select').prop('disabled', true);
        setTimeout(() => $('#kycForm input, #kycForm select').prop('disabled', false), window.__KYC_DELAY_MS__);
      }
      $('#kycForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({ url: '/api/verify-submission', type: 'POST', contentType: 'application/json',
          data: JSON.stringify({ scenarioId: '${scenario.id}', data: collectData() }),
          success: r => { $('#resultBox').show(); $('#scoreVal').text(r.report.score); $('#resultJson').text(JSON.stringify(r.report, null, 2)); }
        });
      });
    });
  </script>
</body>
</html>`;
}

function renderPhpStack(scenario) {
  const meta = STACK_META.php;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);
  const fieldHtml = fields.map((f, i) => fieldWrapperHtml(f, scenario, fieldInputHtml(f, scenario))).join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${scenario.name} — ${meta.name}</title>
  <style>${commonStyles(meta)}
    fieldset { border: 1px solid ${meta.accent}; border-radius: 6px; padding: 18px; margin-bottom: 20px; }
    legend { color: ${meta.color}; font-weight: bold; padding: 0 10px; }
  </style>
  ${commonDelayScript(flags)}
</head>
<body>
  <div class="container">
    <span class="badge">${meta.name} (${meta.share} share)</span>
    <h1>${scenario.name}</h1>
    <p class="desc">${scenario.description}</p>
    <form id="phpKycForm" data-scenario="${scenario.id}">
      <input type="hidden" name="csrf_token" value="csrf-token-${scenario.id}">
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
      data.esign_consent = document.getElementById('esign_consent')?.checked || false;
      data.terms_consent = document.getElementById('terms_consent')?.checked || false;
      if (window.__KYC_DELAY_MS__) await new Promise(r => setTimeout(r, window.__KYC_DELAY_MS__));
      const res = await fetch('/api/verify-submission', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ scenarioId: '${scenario.id}', data }) });
      const result = await res.json();
      document.getElementById('resultBox').style.display = 'block';
      document.getElementById('scoreVal').textContent = result.report.score;
      document.getElementById('resultJson').textContent = JSON.stringify(result.report, null, 2);
    });
  </script>
</body>
</html>`;
}

function renderFlaskStack(scenario) {
  const meta = STACK_META.flask;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);
  const fieldHtml = fields.map(f => fieldWrapperHtml(f, scenario, fieldInputHtml(f, scenario))).join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${scenario.name} — ${meta.name}</title>
  <style>${commonStyles(meta)}
    .card-block { background: ${adjustColor(meta.bg, -10)}; border: 1px solid ${meta.accent}; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
    .card-heading { color: ${meta.color}; font-size: 1.1rem; border-bottom: 1px solid ${meta.accent}; padding-bottom: 8px; margin-top: 0; margin-bottom: 18px; }
  </style>
  ${commonDelayScript(flags)}
</head>
<body>
  <div class="container">
    <span class="badge">${meta.name} (${meta.share} share)</span>
    <h1>${scenario.name}</h1>
    <p class="desc">${scenario.description}</p>
    <form id="flaskForm" data-scenario="${scenario.id}">
      <input type="hidden" name="csrf_token" value="csrf-token-flask-${scenario.id}">
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
      data.esign_consent = document.getElementById('esign_consent')?.checked || false;
      data.terms_consent = document.getElementById('terms_consent')?.checked || false;
      if (window.__KYC_DELAY_MS__) await new Promise(r => setTimeout(r, window.__KYC_DELAY_MS__));
      const res = await fetch('/api/verify-submission', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ scenarioId: '${scenario.id}', data }) });
      const result = await res.json();
      document.getElementById('resultBox').style.display = 'block';
      document.getElementById('scoreVal').textContent = result.report.score;
      document.getElementById('resultJson').textContent = JSON.stringify(result.report, null, 2);
    });
  </script>
</body>
</html>`;
}

function renderReactStack(scenario) {
  const meta = STACK_META.react;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);

  const initialState = {};
  scenario.fields.forEach(f => { initialState[f.id] = scenario.groundTruth[f.id] !== undefined ? scenario.groundTruth[f.id] : ''; });

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
    } else if (['select', 'combobox', 'searchable_select'].includes(f.type)) {
      el = `<select name="${f.id}" value={formData.${f.id}} onChange={handleChange} ${f.required ? 'required' : ''}>${(f.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
    } else {
      const type = f.type === 'date' ? 'date' : f.type === 'number' ? 'number' : f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text';
      el = `<input type="${type}" name="${f.id}" value={formData.${f.id}} onChange={handleChange} ${f.placeholder ? `placeholder="${f.placeholder}"` : ''} ${f.required ? 'required' : ''} />`;
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
  <title>${scenario.name} — ${meta.name}</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>${commonStyles(meta)}</style>
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
        const res = await fetch('/api/verify-submission', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scenarioId: '${scenario.id}', data: formData })
        });
        const result = await res.json();
        setReport(result.report);
      };

      return (
        <div className="container">
          <span className="badge">${meta.name} (${meta.share} share)</span>
          <h1>${scenario.name}</h1>
          <p className="desc">${scenario.description}</p>
          <form onSubmit={handleSubmit}>
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

function renderAngularStack(scenario) {
  const meta = STACK_META.angular;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);

  const initialState = {};
  scenario.fields.forEach(f => { initialState[f.id] = scenario.groundTruth[f.id] !== undefined ? scenario.groundTruth[f.id] : ''; });

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
    } else if (['select', 'combobox', 'searchable_select'].includes(f.type)) {
      el = `<select id="${f.id}" ng-model="form.${f.id}" ${f.required ? 'required' : ''}>${(f.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
    } else {
      const type = f.type === 'date' ? 'date' : f.type === 'number' ? 'number' : f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text';
      el = `<input type="${type}" id="${f.id}" ng-model="form.${f.id}" ${f.placeholder ? `placeholder="${f.placeholder}"` : ''} ${f.required ? 'required' : ''} />`;
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
  <title>${scenario.name} — ${meta.name}</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <style>${commonStyles(meta)}</style>
  ${commonDelayScript(flags)}
</head>
<body ng-app="kycApp" ng-controller="KycController">
  <div class="container">
    <span class="badge">${meta.name} (${meta.share} share)</span>
    <h1>${scenario.name}</h1>
    <p class="desc">${scenario.description}</p>
    <form ng-submit="submitForm()">
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
          if (window.__KYC_DELAY_MS__) {
            setTimeout(() => this.doSubmit(), window.__KYC_DELAY_MS__);
          } else {
            this.doSubmit();
          }
        };
        $scope.doSubmit = function() {
          const payload = Object.assign({}, $scope.form);
          if (payload.dob instanceof Date) payload.dob = payload.dob.toISOString().split('T')[0];
          $http.post('/api/verify-submission', { scenarioId: '${scenario.id}', data: payload })
            .then(r => { $scope.report = r.data.report; });
        };
      }]);
  </script>
</body>
</html>`;
}

function renderVueStack(scenario) {
  const meta = STACK_META.vue;
  const flags = scenario.stressFlags || {};
  const fields = prepareFields(scenario);

  const initialState = {};
  scenario.fields.forEach(f => { initialState[f.id] = scenario.groundTruth[f.id] !== undefined ? scenario.groundTruth[f.id] : ''; });

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
    } else if (['select', 'combobox', 'searchable_select'].includes(f.type)) {
      el = `<select id="${f.id}" v-model="form.${f.id}" ${f.required ? 'required' : ''}>${(f.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
    } else {
      const type = f.type === 'date' ? 'date' : f.type === 'number' ? 'number' : f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text';
      el = `<input type="${type}" id="${f.id}" v-model="form.${f.id}" ${f.placeholder ? `placeholder="${f.placeholder}"` : ''} ${f.required ? 'required' : ''} />`;
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
  <title>${scenario.name} — ${meta.name}</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>${commonStyles(meta)}</style>
  ${commonDelayScript(flags)}
</head>
<body>
  <div id="app" class="container">
    <span class="badge">${meta.name} (${meta.share} share)</span>
    <h1>${scenario.name}</h1>
    <p class="desc">${scenario.description}</p>
    <form @submit.prevent="submitForm">
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
          const res = await fetch('/api/verify-submission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scenarioId: '${scenario.id}', data: form.value })
          });
          const data = await res.json();
          report.value = data.report;
        };
        return { form, report, submitForm, disabled };
      }
    }).mount('#app');
  </script>
</body>
</html>`;
}

function renderStackForm(scenario, stack) {
  switch (stack) {
    case 'html': return renderHtmlStack(scenario);
    case 'react': return renderReactStack(scenario);
    case 'angular': return renderAngularStack(scenario);
    case 'vue': return renderVueStack(scenario);
    case 'php': return renderPhpStack(scenario);
    case 'flask': return renderFlaskStack(scenario);
    default: return renderHtmlStack(scenario);
  }
}

function adjustColor(hex, percent) {
  // Very simple lighten for hex colors
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

function generateAllForms() {
  const scenarioList = scenarios.listScenarios();
  console.log(`Generating forms for ${scenarioList.length} scenarios × ${STACKS.length} stacks = ${scenarioList.length * STACKS.length} files...`);

  STACKS.forEach(stack => {
    const outDir = path.join(__dirname, 'stacks', stack);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    scenarioList.forEach(s => {
      const scenario = scenarios.getScenario(s.id);
      const html = renderStackForm(scenario, stack);
      fs.writeFileSync(path.join(outDir, `${s.id}.html`), html);
    });
    console.log(`  ✓ ${STACK_META[stack].name}: ${scenarioList.length} forms`);
  });

  console.log('Form generation complete.');
}

// Deprecated: form generation logic has moved to form-renderers.js and generate-forms-new.js.
// This file is kept for reference and should be removed.
