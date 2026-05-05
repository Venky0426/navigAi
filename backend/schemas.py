from pydantic import BaseModel
from typing import Optional

class AIGuidanceRequest(BaseModel):
    current_year: int
    current_skills: str
    target_role: str
    progress_summary: Optional[str] = None

class AIGuidanceResponse(BaseModel):
    advice: str
