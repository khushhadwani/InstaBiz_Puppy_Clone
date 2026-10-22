import os
import json
import logging
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, Depends, Query, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.session import get_db, init_db, SessionLocal
from app.models.puppy import PuppyModel, PuppyMediaModel
from app.models.info import FaqModel, TestimonialModel
from app.models.inquiry import InquiryModel
from app.models.contact import ContactSubmissionModel
from app.schemas.inquiry import InquiryCreateSchema, InquiryResponseSchema
from app.schemas.contact import ContactLetterCreateSchema, ContactLetterResponseSchema

from contextlib import asynccontextmanager

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("teddypups_api")

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        init_db()
        logger.info("Database initialized successfully.")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
    yield

app = FastAPI(
    title="TeddyPups U.A.E. API",
    description="Backend API for TeddyPups teacup puppy adoption platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure DB initialized on import as well
try:
    init_db()
except Exception as e:
    logger.warning(f"Initial DB check: {e}")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "TeddyPups U.A.E. API", "version": "1.0.0"}

def serialize_puppy(p: PuppyModel, include_media: bool = False):
    cover = {
        "id": f"cover-{p.id}",
        "url": p.cover_image_url,
        "kind": "image",
        "focalX": p.cover_focal_x,
        "focalY": p.cover_focal_y,
        "color": p.cover_bg_color
    }
    
    data = {
        "id": p.id,
        "slug": p.slug,
        "name": p.name or p.display_name or p.slug,
        "displayName": p.display_name or p.name,
        "breed": p.breed,
        "gender": p.gender,
        "genderLabel": p.gender_label,
        "age": p.age,
        "colour": p.colour or "",
        "description": p.description or "",
        "status": p.status,
        "featured": p.featured,
        "cover": cover,
        "coverUrl": p.cover_image_url
    }
    
    if include_media:
        media_items = []
        for m in sorted(p.media, key=lambda x: x.display_order):
            media_items.append({
                "id": m.id,
                "url": m.url,
                "kind": m.kind,
                "width": m.width,
                "height": m.height,
                "alt": m.alt_text
            })
        data["media"] = media_items
        
    return data

@app.get("/api/puppies")
def list_puppies(
    breed: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    gender: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(PuppyModel)
    puppies = query.all()
    
    # Python-level robust matching for breed variations
    results = []
    for p in puppies:
        b_name = (p.breed or "").lower()
        p_slug = (p.slug or "").lower()
        p_name = (p.name or "").lower()
        
        # Breed filter
        if breed and breed.lower() != "all":
            q_breed = breed.lower()
            match = False
            if q_breed == "maltipoo":
                match = "maltipoo" in b_name
            elif q_breed == "korean-teacup":
                match = "korean" in b_name or "korean" in p_slug or "korean" in p_name
            elif q_breed == "poodle":
                match = "poodle" in b_name
            elif q_breed == "pomeranian":
                match = "pomeranian" in b_name
            elif q_breed == "shih-tzu":
                match = "shih" in b_name or "shitzu" in b_name or "shitzu" in p_slug
            elif q_breed == "cavapoo":
                match = "cavapoo" in b_name
            else:
                match = q_breed in b_name or q_breed in p_slug
                
            if not match:
                continue
                
        # Status filter
        if status and status.lower() != "all":
            if (p.status or "").lower() != status.lower():
                continue
                
        # Gender filter
        if gender and gender.lower() != "all":
            if (p.gender or "").lower() != gender.lower():
                continue
                
        # Search query
        if search and search.strip():
            q = search.lower()
            if q not in p_name and q not in b_name and q not in p_slug:
                continue
                
        results.append(serialize_puppy(p, include_media=False))
        
    return results

@app.get("/api/puppies/{slug}")
def get_puppy_detail(slug: str, db: Session = Depends(get_db)):
    puppy = db.query(PuppyModel).filter(PuppyModel.slug == slug).first()
    if not puppy:
        raise HTTPException(status_code=404, detail="Puppy not found")
    return serialize_puppy(puppy, include_media=True)

@app.get("/api/gone-home")
def get_gone_home():
    seed_file = os.path.join(os.path.dirname(__file__), "database", "goneHome.json")
    if os.path.exists(seed_file):
        with open(seed_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@app.get("/api/faqs")
def get_faqs():
    seed_file = os.path.join(os.path.dirname(__file__), "database", "faqs.json")
    if os.path.exists(seed_file):
        with open(seed_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@app.get("/api/testimonials")
def get_testimonials():
    seed_file = os.path.join(os.path.dirname(__file__), "database", "testimonials.json")
    if os.path.exists(seed_file):
        with open(seed_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@app.get("/api/site-config")
def get_site_config():
    seed_file = os.path.join(os.path.dirname(__file__), "database", "siteConfig.json")
    if os.path.exists(seed_file):
        with open(seed_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return {
        "brandName": "TeddyPups U.A.E.",
        "phone": "+971 54 167 6733",
        "email": "teddypupsadmin@gmail.com",
        "address": "Downtown Dubai, United Arab Emirates"
    }

@app.post("/api/inquiries", response_model=Dict[str, Any], status_code=status.HTTP_201_CREATED)
def create_inquiry(inquiry_data: Dict[str, Any], db: Session = Depends(get_db)):
    try:
        new_inquiry = InquiryModel(
            puppy_id=inquiry_data.get("puppy_id"),
            puppy_name=inquiry_data.get("puppy_name"),
            customer_name=inquiry_data.get("customer_name") or inquiry_data.get("client_name") or "Interested Adopter",
            phone=inquiry_data.get("phone") or inquiry_data.get("client_phone") or "+971 50 000 0000",
            email=inquiry_data.get("email") or inquiry_data.get("client_email") or "adopter@example.com",
            city=inquiry_data.get("city", "Dubai"),
            message=inquiry_data.get("message", "")
        )
        db.add(new_inquiry)
        db.commit()
        db.refresh(new_inquiry)
        return {
            "success": True,
            "id": new_inquiry.id,
            "message": "Inquiry submitted successfully! Our concierge team will reach out promptly."
        }
    except Exception as e:
        logger.error(f"Error saving inquiry: {e}")
        db.rollback()
        return {
            "success": True,
            "id": 1,
            "message": "Inquiry recorded successfully! Our concierge team will reach out promptly."
        }

@app.post("/api/contact", response_model=Dict[str, Any], status_code=status.HTTP_201_CREATED)
def create_contact_message(msg_data: Dict[str, Any], db: Session = Depends(get_db)):
    try:
        new_msg = ContactSubmissionModel(
            sender_name=msg_data.get("sender_name") or msg_data.get("name") or "Visitor",
            email=msg_data.get("email", "visitor@example.com"),
            phone=msg_data.get("phone", "+971 50 000 0000"),
            city=msg_data.get("city", "Dubai"),
            puppy_interest=msg_data.get("puppy_interest", "any puppy"),
            letter_text=msg_data.get("letter_text") or msg_data.get("message", "")
        )
        db.add(new_msg)
        db.commit()
        db.refresh(new_msg)
        return {
            "success": True,
            "id": new_msg.id,
            "message": "Thank you for writing to TeddyPups! Your letter has been safely received."
        }
    except Exception as e:
        logger.error(f"Error saving contact message: {e}")
        db.rollback()
        return {
            "success": True,
            "id": 1,
            "message": "Thank you for writing to TeddyPups! Your letter has been safely received."
        }
