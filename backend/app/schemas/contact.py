from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import datetime

class ContactLetterCreateSchema(BaseModel):
    sender_name: str = Field(..., min_length=2, max_length=150)
    phone: str = Field(..., min_length=6, max_length=50)
    email: EmailStr
    city: str = Field(..., min_length=2, max_length=100)
    puppy_interest: Optional[str] = "any puppy"
    letter_text: Optional[str] = ""

class ContactLetterResponseSchema(ContactLetterCreateSchema):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
