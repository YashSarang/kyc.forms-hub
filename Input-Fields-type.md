# Input Field Types & Interaction Patterns

| Category | Variations |
|---|---|
|**Text Inputs**|Single-line, multiline, rich text, auto-growing textarea|
|**Numeric Inputs**|Integer, decimal, currency, percentage, stepper/spinner|
|**Masked Inputs**|PAN, Aadhaar, SSN, credit card, phone, license plate|
|**Password Inputs**|Password, confirm password, strength meter, show/hide|
|**Dropdowns**|Native select, custom dropdown, searchable, async search, multi-select|
|**Selection Controls**|Radio, checkbox, toggle switch, chips/tags, segmented control|
|**Date & Time**|Calendar picker, month/year picker, DOB selector, time picker, date range, relative date|
|**File Upload**|Drag-and-drop, click upload, camera capture, multiple files, image crop, PDF only|
|**OTP / Verification**|Single box, multi-box, auto-focus, auto-read, resend timer, CAPTCHA after OTP|
|**Navigation**|Single page, multi-step wizard, progress bar, accordion, tabs|
|**Consent**|Checkbox, signature, initials, digital signature|
|**Buttons**|Next, Previous, Save Draft, Continue, Submit, Cancel, Review|
|**Review Screen**|Summary page, editable review, confirmation dialog|

---

# Dynamic interactions

These are often where agents struggle.

### Conditional fields

```
Are you married?

Yes
 ↓
Spouse Name

No
 ↓
Continue
```

---

### Progressive disclosure

```
Employment

↓ expands

Employer
Salary
Experience
```

---

### Cascading dropdowns

```
Country
 ↓

State
 ↓

District
 ↓

City
```

---

### Async autocomplete

```
Type bank name...

→ API search

→ Suggestions appear
```

---

### Dynamic validation

- PAN regex
- Aadhaar checksum
- Password strength
- Live email validation
- Username availability

---

### Auto-filled fields

```
PIN Code

↓

State (auto)

↓

City (auto)
```

Agent should avoid overwriting correct auto-filled values.

---

### Duplicate labels

```
Address

Communication Address

Permanent Address

Office Address
```

---

### Repeatable sections

```
Add Family Member

+

Add Family Member

+

Add Family Member
```

Very common in insurance and visa forms.

---

### Editable tables

```
Qualification

+ Add Row

School
Year
Grade
```

---

### Dynamic collections

```
Previous Employers

+

+

+
```

---

# Modern UI widgets

Increasingly common in React/Angular applications:

- Combobox
- Token/chip input
- Typeahead
- Mention field
- Tree selector
- Hierarchical dropdown
- Nested menu
- Color picker (rare)
- Rating selector
- Slider
- Range slider

---

# Modal interactions

- Popup dialog
- Side drawer
- Bottom sheet (mobile)
- Confirmation modal
- Cookie banner
- Notification popup
- Session timeout popup

---

# Browser interactions

- Infinite scrolling
- Lazy loading
- Virtualized lists
- Sticky headers
- Floating buttons
- Hidden elements
- Scroll-to-load

---

# Accessibility variations

Agents should work with:

- Label element
- aria-label
- aria-labelledby
- placeholder-only
- icon-only buttons
- tooltip-based descriptions

---

# Enterprise/Government-specific

These are especially relevant for KYC:

- Address lookup
- DigiLocker import
- Aadhaar eKYC
- PAN verification
- Webcam capture
- Live face verification
- Signature pad
- Document preview
- PDF viewer before submission
- "Same as current address"
- Save & Resume later

---

# Error handling scenarios

Include cases where the agent must recover:

- Required field error
- Invalid format
- Server validation error
- Duplicate email
- Expired OTP
- Session timeout
- Network retry
- CAPTCHA encountered
- File too large
- Unsupported file type