# Google Sheets enquiry setup

The website sends consultation and contact enquiries to a Google Apps Script
Web App. A normal Google Sheet sharing link cannot receive submissions.

## 1. Prepare the spreadsheet

Create a private Google Sheet owned by the Infimind account. Do not publish it
to the web and do not enable “Anyone with the link” editing.

Copy the spreadsheet ID from:

```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

## 2. Create the Apps Script

From the Sheet, open **Extensions > Apps Script**. Replace the editor contents
with [google-apps-script/Code.gs](google-apps-script/Code.gs).

Open **Project Settings > Script properties** and add:

```text
SPREADSHEET_ID = the spreadsheet ID copied above
```

The ID remains in Google's server-side script properties and is not placed in
the website bundle.

## 3. Deploy the Web App

Choose **Deploy > New deployment > Web app**:

- Execute as: **Me**
- Who has access: **Anyone**

Authorise the script, deploy it, and copy the production URL ending in `/exec`.
Do not use the `/dev` test URL.

Google's deployment guide:
https://developers.google.com/apps-script/guides/web

## 4. Connect the website

Put the production `/exec` URL in `.env`:

```text
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Rebuild the site after changing this value.

## Security characteristics

- The Sheet stays private and the browser never receives its ID.
- The script validates every field again on Google's server.
- Formula-like values are escaped before insertion to prevent spreadsheet
  formula injection.
- A script lock prevents concurrent submissions from colliding.
- Each email address is limited to five accepted requests per hour.
- The website includes a honeypot and minimum completion-time check.
- The script returns generic public errors and records detailed errors only in
  the Apps Script execution log.

This endpoint is public by necessity. Google Apps Script also has service
quotas, so it is neither unlimited nor equivalent to a dedicated high-volume
backend. If spam becomes a problem, add Cloudflare Turnstile before launch or
move submissions to a rate-limited server endpoint.

## Final test

After adding the `/exec` URL:

1. Submit the contact form.
2. Confirm exactly one row appears in the `Enquiries` tab.
3. Submit the consultation modal.
4. Confirm the source and programme columns are correct.
5. Test a value beginning with `=` and confirm the Sheet stores it as text.
6. Confirm `/admin` remains unavailable and Sign In always returns the generic
   invalid-credentials message.
