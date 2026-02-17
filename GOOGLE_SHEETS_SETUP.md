# Google Sheets Integration Setup

This document explains how to set up Google Sheets integration for guest registration and evaluation forms.

## Prerequisites

1. A Google Cloud Platform account
2. Two Google Sheets (one for guest registrations, one for evaluations)

## Setup Steps

### 1. Create Google Sheets

Create two Google Sheets:

1. **Guest Registration Sheet** with headers:
   - Data/Hora
   - Nome
   - Telefone
   - Local de Origem
   - Data de Nascimento

2. **Evaluation Sheet** with headers:
   - Data/Hora
   - Avaliação Geral
   - Limpeza
   - Conforto
   - Localização
   - Custo-Benefício
   - Comentários

Note the Spreadsheet IDs from the URLs (the long alphanumeric string in the URL).

### 2. Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Enable the Google Drive API (optional, for more features):
   - Search for "Google Drive API"
   - Click "Enable"

### 3. Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Give it a name (e.g., "pousada-sheets-service")
4. Click "Create and Continue"
5. Skip "Grant this service account access to project" (optional)
6. Click "Done"

### 4. Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Click "Create" - a JSON file will be downloaded

### 5. Share Sheets with Service Account

1. Open both Google Sheets
2. Click "Share" in each sheet
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it "Editor" permissions
5. Uncheck "Notify people"
6. Click "Share"

### 6. Configure Backend

Set the following environment variables:

```bash
# For production (recommended)
export GOOGLE_SHEETS_CREDENTIALS='{"type": "service_account", "project_id": "...", ...}'
export GUESTS_SPREADSHEET_ID="your-guests-sheet-id"
export EVALUATIONS_SPREADSHEET_ID="your-evaluations-sheet-id"
```

Or for development:

```bash
# For development
export GOOGLE_SHEETS_CREDENTIALS_FILE="/path/to/credentials.json"
export GUESTS_SPREADSHEET_ID="your-guests-sheet-id"
export EVALUATIONS_SPREADSHEET_ID="your-evaluations-sheet-id"
```

### 7. Initialize Sheets (Optional)

If you haven't added headers manually, you can initialize them by running:

```python
from app.services.google_sheets_service import google_sheets_service
google_sheets_service.initialize_sheets()
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_SHEETS_CREDENTIALS` | Full JSON credentials as string | `'{"type": "service_account", ...}'` |
| `GOOGLE_SHEETS_CREDENTIALS_FILE` | Path to credentials JSON file | `/path/to/credentials.json` |
| `GUESTS_SPREADSHEET_ID` | ID of the guest registration sheet | `1abc...xyz` |
| `EVALUATIONS_SPREADSHEET_ID` | ID of the evaluation sheet | `1def...uvw` |

## Testing

1. Start the backend:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. Test the endpoints:
   ```bash
   # Test guest registration
   curl -X POST http://localhost:8000/api/guests/register \
     -H "Content-Type: application/json" \
     -d '{"guests": [{"name": "Test User", "phone": "123456789", "origin": "Test City", "birthDate": "1990-01-01"}]}'

   # Test evaluation
   curl -X POST http://localhost:8000/api/evaluations/submit \
     -H "Content-Type: application/json" \
     -d '{"overallRating": 5, "cleanlinessRating": 5, "comfortRating": 5, "locationRating": 5, "valueRating": 5, "comment": "Great!", "submittedAt": "2024-01-01T00:00:00Z"}'
   ```

## Accessing the Forms

The forms are accessible via direct URLs:

- Guest Registration: `https://your-domain.com/cadastro-hospedes`
- Evaluation: `https://your-domain.com/avaliacao`

These pages are **not** accessible from the main navigation menu and can only be accessed via direct links.

## Troubleshooting

### "Google Sheets credentials not found"
- Make sure you've set the `GOOGLE_SHEETS_CREDENTIALS` or `GOOGLE_SHEETS_CREDENTIALS_FILE` environment variable
- Check that the JSON file is valid and accessible

### "Failed to save to Google Sheets"
- Verify the spreadsheet IDs are correct
- Make sure the service account has been granted Editor access to both sheets
- Check that the Google Sheets API is enabled in your Google Cloud project

### "Permission denied"
- The service account email must be added as an editor to both Google Sheets
- Make sure you shared the sheets with the exact email from the credentials JSON

## Security Notes

- **Never commit** the credentials JSON file to version control
- Keep the `GOOGLE_SHEETS_CREDENTIALS` environment variable secure
- Use environment-specific credentials for development and production
- Consider rotating service account keys periodically
- The service account only needs access to these two specific sheets
