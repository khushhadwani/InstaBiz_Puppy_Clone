from sqlalchemy import Column, String, Boolean, Float, Integer, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.session import Base

class PuppyModel(Base):
    __tablename__ = "puppies"

    id = Column(String(36), primary_key=True, index=True)
    slug = Column(String(120), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    display_name = Column(String(100), nullable=False)
    breed = Column(String(100), index=True, nullable=False)
    gender = Column(String(20), index=True, nullable=False)
    gender_label = Column(String(20), nullable=False)
    age = Column(String(50), nullable=False)
    colour = Column(String(50), default="")
    description = Column(Text, default="")
    status = Column(String(30), default="available", index=True, nullable=False)
    featured = Column(Boolean, default=False)
    origin = Column(String(50), default="local")
    
    cover_image_url = Column(String(500), nullable=False)
    cover_focal_x = Column(Float, default=0.5)
    cover_focal_y = Column(Float, default=0.5)
    cover_bg_color = Column(String(20), default="#785838")
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    media = relationship("PuppyMediaModel", back_populates="puppy", cascade="all, delete-orphan", order_by="PuppyMediaModel.display_order")


class PuppyMediaModel(Base):
    __tablename__ = "puppy_media"

    id = Column(String(36), primary_key=True)
    puppy_id = Column(String(36), ForeignKey("puppies.id", ondelete="CASCADE"), nullable=False, index=True)
    url = Column(String(500), nullable=False)
    kind = Column(String(20), default="image")
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    alt_text = Column(String(255), default="")
    display_order = Column(Integer, default=0)

    puppy = relationship("PuppyModel", back_populates="media")
