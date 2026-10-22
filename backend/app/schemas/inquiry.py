from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

class InquiryCreateSchema(BaseModel):
    puppy_id: Optional[str] = None
    puppy_name: Optional[str] = None
    customer_name: str = Field(..., min_length=2, max_length=150)
    phone: str = Field(..., min_length=6, max_length=50)
    email: str
    city: Optional[str] = "Dubai"
    message: Optional[str] = ""

class InquiryResponseSchema(InquiryCreateSchema):
    id: int
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
