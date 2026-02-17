# Guest Registration and Evaluation Forms

This document describes the guest registration and anonymous evaluation features added to the Pousada Villa & Mar website.

## Overview

Two new Single Page Applications (SPAs) have been added to the frontend:

1. **Guest Registration** (`/cadastro-hospedes`) - For registering guest information
2. **Anonymous Evaluation** (`/avaliacao`) - For collecting anonymous feedback

Both forms submit data to Google Sheets for easy management and analysis.

## Features

### Guest Registration (`/cadastro-hospedes`)

A form for collecting guest information with the following features:

- **Multiple Guests**: Add as many guests as needed in a single submission
- **Required Fields**:
  - Full Name
  - Phone Number
  - Place of Origin (City - State)
  - Date of Birth
- **Data Storage**: All data is saved to a Google Sheet
- **Privacy**: Includes a privacy notice about data usage

**Direct Access Only**: This page is accessible only via direct URL and is not listed in the navigation menu.

### Anonymous Evaluation (`/avaliacao`)

An anonymous feedback form with:

- **Overall Rating**: 5-star rating for general experience
- **Detailed Ratings**: Individual ratings for:
  - Cleanliness
  - Comfort
  - Location
  - Value for Money
- **Optional Comments**: Free-text feedback field
- **Success Confirmation**: Visual confirmation after submission
- **Complete Anonymity**: No personal information is collected

**Direct Access Only**: This page is accessible only via direct URL and is not listed in the navigation menu.

## Architecture

### Frontend (React + TypeScript)

Located in:
- `/frontend/pages/GuestRegistration.tsx`
- `/frontend/pages/Evaluation.tsx`

Both pages are:
- Built with React and TypeScript
- Styled with Tailwind CSS
- Integrated with React Router for routing
- Responsive and mobile-friendly

### Backend (FastAPI + Python)

Located in:
- `/backend/app/api/guests_routes.py` - Guest registration endpoint
- `/backend/app/api/evaluations_routes.py` - Evaluation endpoint
- `/backend/app/services/google_sheets_service.py` - Google Sheets integration

API Endpoints:
- `POST /api/guests/register` - Register guests
- `POST /api/evaluations/submit` - Submit evaluation

### Data Storage (Google Sheets)

Data is stored in two separate Google Sheets:
1. **Guest Registration Sheet** - Contains guest information
2. **Evaluation Sheet** - Contains anonymous evaluation data

## Setup Instructions

### Prerequisites

1. Google Cloud Platform account
2. Two Google Sheets created with appropriate headers
3. Service account with Google Sheets API access

### Detailed Setup

See [GOOGLE_SHEETS_SETUP.md](../GOOGLE_SHEETS_SETUP.md) for complete setup instructions.

### Quick Setup

1. Create Google Sheets with headers
2. Set up Google Cloud project and enable APIs
3. Create service account and download credentials
4. Share sheets with service account email
5. Set environment variables:

```bash
export GOOGLE_SHEETS_CREDENTIALS='{"type": "service_account", ...}'
export GUESTS_SPREADSHEET_ID="your-guests-sheet-id"
export EVALUATIONS_SPREADSHEET_ID="your-evaluations-sheet-id"
```

## Usage

### Sharing the Forms

Share the direct URLs with guests:
- Guest Registration: `https://your-domain.com/cadastro-hospedes`
- Evaluation: `https://your-domain.com/avaliacao`

You can:
- Send via WhatsApp or email
- Create QR codes for the URLs
- Print cards with QR codes for in-person access

### Viewing Submissions

All submissions are stored in the configured Google Sheets. You can:
- View data in real-time in Google Sheets
- Export to Excel or CSV
- Create charts and dashboards
- Set up email notifications for new submissions

## Technical Details

### Frontend Technologies

- **React 19**: Latest React version with modern hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Router**: Client-side routing

### Backend Technologies

- **FastAPI**: Modern Python web framework
- **gspread**: Google Sheets Python library
- **google-auth**: Google authentication library
- **Pydantic**: Data validation

### Security Features

- **Thread-safe**: Google Sheets client initialization is thread-safe
- **Error Logging**: Uses Python logging module for production-ready error handling
- **Environment Variables**: Sensitive credentials stored as environment variables
- **CORS Protection**: Backend configured with CORS middleware
- **Input Validation**: Pydantic models validate all input data

## Troubleshooting

### Common Issues

1. **"Google Sheets credentials not found"**
   - Verify environment variables are set correctly
   - Check JSON format is valid

2. **"Failed to save to Google Sheets"**
   - Ensure spreadsheet IDs are correct
   - Verify service account has Editor access
   - Check Google Sheets API is enabled

3. **"Permission denied"**
   - Share sheets with service account email
   - Grant Editor permissions

### Testing Without Google Sheets

If you want to test the frontend without Google Sheets:
1. The forms will display correctly
2. Submissions will fail with an error message
3. Set up Google Sheets to enable full functionality

## Maintenance

### Updating Forms

To modify form fields:
1. Update the TypeScript interfaces in the page components
2. Update the API endpoint models in the backend
3. Update the Google Sheets headers to match

### Monitoring

To monitor form submissions:
1. Check Google Sheets for new data
2. Review backend logs for errors
3. Set up Google Sheets notifications for new rows

## Best Practices

1. **Regular Backups**: Periodically backup your Google Sheets data
2. **Access Control**: Limit who can view and edit the sheets
3. **Data Retention**: Establish a policy for how long to keep data
4. **Privacy Compliance**: Ensure compliance with local privacy laws (LGPD, GDPR)

## Future Enhancements

Potential improvements:
- Email notifications on form submission
- PDF generation for guest registration
- Analytics dashboard for evaluations
- Multi-language support
- Integration with booking systems

## Support

For issues or questions:
1. Check the [GOOGLE_SHEETS_SETUP.md](../GOOGLE_SHEETS_SETUP.md) guide
2. Review backend logs for error messages
3. Verify all environment variables are set correctly
