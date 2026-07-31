# Form Canonical Fields

This document lists the complete canonical KYC field set used by the benchmark. Fields marked with `*` are required in the full `baseline` scenario; individual level/issue scenarios may use subsets.

## Personal Identity
- Full Name*
- First Name*
- Middle Name
- Last Name
- Preferred Name
- Gender*
- Date of Birth*
- Age (auto-calculated)
- Nationality*
- Marital Status*

## Contact
- Mobile Number*
- Alternate Mobile
- Landline
- Email*
- Current Address
    - Address Line 1*
    - Address Line 2
    - Landmark
    - City*
    - District*
    - State*
    - PIN Code*
    - Country*
- Permanent Address (same sub-fields as current address)
    - Same-as-current-address checkbox

## Identity Documents
- Aadhaar Number (with upload option)
- PAN Number (with upload option)
- Passport Number (with upload option)
- Driving Licence Number (with upload option)
- Voter ID (with upload option)

## Banking
- Bank Name
- Branch
- Account Number
- IFSC Code
- Account Type

## Employment
- Occupation
- Employment Type
- Employer Name
- Designation
- Industry

## Financial Profile
- Annual Income
- Income Range
- Sources of Income
- Net Worth
- Investment Experience
- Politically Exposed Person (PEP)
- Beneficial Owner

## Nominee
- Nominee Name
- Relationship
- Date of Birth
- Share Percentage

## Family Details
- Father's Name
- Mother's Name
- Spouse Name
- Guardian Name
- Emergency Contact
    - Name
    - Relationship
    - Address
    - Phone Number

## Document Uploads
- Aadhaar Front
- Aadhaar Back
- PAN Card
- Passport
- Driving Licence
- Selfie / Photo
- Signature
- Proof of Address
- Income Proof

## Verification
- OTP
- Email OTP
- Mobile OTP
- eSign Consent
- Terms & Conditions
- Privacy Consent

## Metadata
- Customer ID
- Application Number
- Branch Code
- Agent ID
- Referral Code

## Input Widget Variations

The following additional canonical fields exercise different widget implementations for the same logical data. Each maps back to an existing profile key (e.g., `dob_dmy_text` maps to the profile `dob` value, formatted as `DD/MM/YYYY`).

### Date variations
- Date of Birth (DD/MM/YYYY text)
- Date of Birth (MM/DD/YYYY text)
- Date of Birth (YYYY-MM-DD text)
- Date of Birth (Day / Month / Year selects)
- Date of Birth (Calendar picker)
- Nominee Date of Birth (DD/MM/YYYY text)
- Month / Year

### Selector variations
- Nationality (Custom dropdown)
- Bank Name (Custom dropdown)
- Income Range (Searchable dropdown)
- Marital Status (Segmented control)

### Radio variations
- Gender (Inline radio)
- Gender (Card selection)
- Account Type (Segmented control)
- Account Type (Cards)

### Checkbox / toggle variations
- eSign Consent (Toggle switch)
- Terms & Conditions (Card checkbox)
- Same-as-current-address (Toggle switch)

### Upload variations
- PAN Card Document (Drag-and-drop zone)
- Aadhaar Documents (Multiple-file input)
- Applicant Photo (Camera capture)