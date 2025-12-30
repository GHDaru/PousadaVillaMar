from typing import List
from datetime import date
from app.models.schemas import ManualBlock


# In-memory storage for manual blocks
# In production, this would be a database
BLOCKS_DB: List[ManualBlock] = []


class BlocksRepository:
    """Repository for managing manual blocks"""
    
    def add_block(self, block: ManualBlock) -> ManualBlock:
        """Add a manual block"""
        BLOCKS_DB.append(block)
        return block
    
    def get_blocks_for_unit(self, unit_id: str, start: date, end: date) -> List[ManualBlock]:
        """Get all manual blocks for a unit in a date range"""
        return [
            block for block in BLOCKS_DB
            if block.unit_id == unit_id
            and not (block.end <= start or block.start >= end)
        ]
    
    def list_blocks_for_unit(self, unit_id: str) -> List[ManualBlock]:
        """List all manual blocks for a unit"""
        return [block for block in BLOCKS_DB if block.unit_id == unit_id]
