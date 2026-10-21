from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database.session import Base

class ContactSubmissionModel(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    sender_name = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(150), nullable=False, index=True)
    city = Column(String(100), nullable=False)
    puppy_interest = Column(String(100), default="any puppy")
    letter_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
