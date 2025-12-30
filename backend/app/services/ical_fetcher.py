import httpx
import asyncio
from typing import Optional, Tuple
from datetime import datetime


class ICSFetcher:
    """Service for fetching ICS files from external sources"""
    
    def __init__(self, timeout: float = 5.0):
        self.timeout = timeout
    
    async def fetch_ics(self, url: str) -> Tuple[Optional[str], Optional[str]]:
        """
        Fetch ICS content from URL
        
        Returns:
            Tuple of (ics_content, error_message)
        """
        if not url:
            return None, "No URL provided"
        
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, follow_redirects=True)
                response.raise_for_status()
                return response.text, None
        except httpx.TimeoutException:
            return None, "Request timeout"
        except httpx.HTTPStatusError as e:
            return None, f"HTTP {e.response.status_code}"
        except Exception as e:
            return None, str(e)
    
    async def fetch_multiple(self, urls: dict[str, Optional[str]]) -> dict[str, Tuple[Optional[str], Optional[str], datetime]]:
        """
        Fetch multiple ICS files in parallel
        
        Args:
            urls: Dict of source_name -> url
        
        Returns:
            Dict of source_name -> (ics_content, error_message, fetched_at)
        """
        async def fetch_with_name(name: str, url: Optional[str]) -> Tuple[str, Optional[str], Optional[str], datetime]:
            fetched_at = datetime.utcnow()
            content, error = await self.fetch_ics(url) if url else (None, "No URL configured")
            return name, content, error, fetched_at
        
        tasks = [fetch_with_name(name, url) for name, url in urls.items()]
        results = await asyncio.gather(*tasks)
        
        return {
            name: (content, error, fetched_at)
            for name, content, error, fetched_at in results
        }
