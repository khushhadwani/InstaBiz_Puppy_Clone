from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from app.database.session import Base

class InquiryModel(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    puppy_id = Column(String(36), ForeignKey("puppies.id", ondelete="SET NULL"), nullable=True)
    puppy_name = Column(String(100), nullable=True)
    customer_name = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(150), nullable=False, index=True)
    city = Column(String(100), default="Dubai")
    message = Column(Text, nullable=True)
    inquiry_type = Column(String(50), default="general")
    status = Column(String(30), default="new")
    created_at = Column(DateTime, default=datetime.utcnow)
