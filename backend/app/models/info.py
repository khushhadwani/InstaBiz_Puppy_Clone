from sqlalchemy import Column, String, Text, Integer
from app.database.session import Base

class FaqModel(Base):
    __tablename__ = "faqs"

    id = Column(String(36), primary_key=True)
    question = Column(String(255), nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String(100), nullable=False)
    display_order = Column(Integer, default=0)

class TestimonialModel(Base):
    __tablename__ = "testimonials"

    id = Column(String(36), primary_key=True)
    client_name = Column(String(150), nullable=False)
    location = Column(String(150), nullable=False)
    puppy_name = Column(String(100), nullable=False)
    quote = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=False)
