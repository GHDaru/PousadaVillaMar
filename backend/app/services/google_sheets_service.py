"""
Google Sheets service for storing guest registrations and evaluations.
"""
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime
from typing import List, Dict, Any
import os
import json


class GoogleSheetsService:
    """Service to interact with Google Sheets."""

    def __init__(self):
        """Initialize Google Sheets service."""
        self.client = None
        self.scopes = [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive'
        ]
        
    def _get_client(self):
        """Get authenticated Google Sheets client."""
        if self.client:
            return self.client
            
        # Try to load credentials from environment variable or file
        creds_json = os.getenv('GOOGLE_SHEETS_CREDENTIALS')
        
        if creds_json:
            # Load from environment variable (for production)
            creds_dict = json.loads(creds_json)
            credentials = Credentials.from_service_account_info(creds_dict, scopes=self.scopes)
        else:
            # Load from file (for development)
            creds_file = os.getenv('GOOGLE_SHEETS_CREDENTIALS_FILE', 'credentials.json')
            if os.path.exists(creds_file):
                credentials = Credentials.from_service_account_file(creds_file, scopes=self.scopes)
            else:
                raise Exception("Google Sheets credentials not found. Set GOOGLE_SHEETS_CREDENTIALS or GOOGLE_SHEETS_CREDENTIALS_FILE environment variable.")
        
        self.client = gspread.authorize(credentials)
        return self.client

    def append_guest_registration(self, guests: List[Dict[str, Any]]) -> bool:
        """
        Append guest registration data to Google Sheets.
        
        Args:
            guests: List of guest dictionaries with name, phone, origin, birthDate
            
        Returns:
            True if successful, False otherwise
        """
        try:
            client = self._get_client()
            spreadsheet_id = os.getenv('GUESTS_SPREADSHEET_ID')
            
            if not spreadsheet_id:
                raise Exception("GUESTS_SPREADSHEET_ID environment variable not set")
            
            spreadsheet = client.open_by_key(spreadsheet_id)
            worksheet = spreadsheet.sheet1  # Use first sheet
            
            # Prepare rows to append
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            rows = []
            for guest in guests:
                row = [
                    timestamp,
                    guest.get('name', ''),
                    guest.get('phone', ''),
                    guest.get('origin', ''),
                    guest.get('birthDate', '')
                ]
                rows.append(row)
            
            # Append all rows at once
            worksheet.append_rows(rows)
            
            return True
            
        except Exception as e:
            print(f"Error appending guest registration to Google Sheets: {e}")
            return False

    def append_evaluation(self, evaluation: Dict[str, Any]) -> bool:
        """
        Append evaluation data to Google Sheets.
        
        Args:
            evaluation: Dictionary with rating fields and optional comment
            
        Returns:
            True if successful, False otherwise
        """
        try:
            client = self._get_client()
            spreadsheet_id = os.getenv('EVALUATIONS_SPREADSHEET_ID')
            
            if not spreadsheet_id:
                raise Exception("EVALUATIONS_SPREADSHEET_ID environment variable not set")
            
            spreadsheet = client.open_by_key(spreadsheet_id)
            worksheet = spreadsheet.sheet1  # Use first sheet
            
            # Prepare row to append
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            row = [
                timestamp,
                evaluation.get('overallRating', 0),
                evaluation.get('cleanlinessRating', 0),
                evaluation.get('comfortRating', 0),
                evaluation.get('locationRating', 0),
                evaluation.get('valueRating', 0),
                evaluation.get('comment', '')
            ]
            
            worksheet.append_row(row)
            
            return True
            
        except Exception as e:
            print(f"Error appending evaluation to Google Sheets: {e}")
            return False

    def initialize_sheets(self):
        """
        Initialize Google Sheets with headers if they don't exist.
        This is a helper method to set up the sheets.
        """
        try:
            client = self._get_client()
            
            # Initialize Guests sheet
            guests_id = os.getenv('GUESTS_SPREADSHEET_ID')
            if guests_id:
                try:
                    spreadsheet = client.open_by_key(guests_id)
                    worksheet = spreadsheet.sheet1
                    # Check if headers exist
                    if not worksheet.row_values(1):
                        worksheet.append_row([
                            'Data/Hora',
                            'Nome',
                            'Telefone',
                            'Local de Origem',
                            'Data de Nascimento'
                        ])
                except Exception as e:
                    print(f"Error initializing guests sheet: {e}")
            
            # Initialize Evaluations sheet
            eval_id = os.getenv('EVALUATIONS_SPREADSHEET_ID')
            if eval_id:
                try:
                    spreadsheet = client.open_by_key(eval_id)
                    worksheet = spreadsheet.sheet1
                    # Check if headers exist
                    if not worksheet.row_values(1):
                        worksheet.append_row([
                            'Data/Hora',
                            'Avaliação Geral',
                            'Limpeza',
                            'Conforto',
                            'Localização',
                            'Custo-Benefício',
                            'Comentários'
                        ])
                except Exception as e:
                    print(f"Error initializing evaluations sheet: {e}")
                    
            return True
            
        except Exception as e:
            print(f"Error initializing sheets: {e}")
            return False


# Singleton instance
google_sheets_service = GoogleSheetsService()
