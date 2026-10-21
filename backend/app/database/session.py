import os
import json
import logging
from sqlalchemy import create_engine, select
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

logger = logging.getLogger(__name__)

Base = declarative_base()

def get_engine():
    db_url = settings.DATABASE_URL
    try:
        if db_url.startswith("sqlite"):
            return create_engine(db_url, connect_args={"check_same_thread": False})
        else:
            # Test MySQL connection
            eng = create_engine(db_url, pool_pre_ping=True)
            with eng.connect() as conn:
                pass
            return eng
    except Exception as e:
        logger.warning(f"Could not connect to configured database ({db_url}): {e}. Falling back to local SQLite database.")
        return create_engine("sqlite:///./teddypups.db", connect_args={"check_same_thread": False})

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
    # Import models here to ensure registration
    from app.models.puppy import PuppyModel, PuppyMediaModel
    from app.models.info import FaqModel, TestimonialModel

    db = SessionLocal()
    try:
        # Check if puppies table is empty
        puppy_count = db.query(PuppyModel).count()
        if puppy_count == 0:
            logger.info("Database is empty. Seeding initial reference puppies and site data...")
            seed_dir = os.path.dirname(__file__)
            
            # Load puppies
            puppies_file = os.path.join(seed_dir, "puppies.json")
            if os.path.exists(puppies_file):
                with open(puppies_file, "r", encoding="utf-8") as f:
                    puppies_data = json.load(f)
                
                for p in puppies_data:
                    cover = p.get("cover") or {}
                    puppy_obj = PuppyModel(
                        id=p.get("id"),
                        slug=p.get("slug"),
                        name=p.get("name"),
                        display_name=p.get("displayName") or p.get("name"),
                        breed=p.get("breed"),
                        gender=p.get("gender"),
                        gender_label=p.get("genderLabel") or p.get("gender", "").capitalize(),
                        age=p.get("age"),
                        colour=p.get("colour", ""),
                        description=p.get("description", ""),
                        status=p.get("status", "available"),
                        featured=p.get("featured", False),
                        cover_image_url=cover.get("url") or "/brand/logo.png",
                        cover_focal_x=cover.get("focalX", 0.5),
                        cover_focal_y=cover.get("focalY", 0.5),
                        cover_bg_color=cover.get("color", "#785838")
                    )
                    db.add(puppy_obj)
                    
                    # Add media
                    for idx, m in enumerate(p.get("media", [])):
                        media_obj = PuppyMediaModel(
                            id=m.get("id") or f"{p.get('id')}-m-{idx}",
                            puppy_id=p.get("id"),
                            url=m.get("url"),
                            kind=m.get("kind", "image"),
                            width=m.get("width"),
                            height=m.get("height"),
                            alt_text=m.get("alt", ""),
                            display_order=idx
                        )
                        db.add(media_obj)
                
                db.commit()
                logger.info(f"Seeded {len(puppies_data)} puppies into database.")

            # Load FAQs
            faqs_file = os.path.join(seed_dir, "faqs.json")
            if os.path.exists(faqs_file):
                with open(faqs_file, "r", encoding="utf-8") as f:
                    faqs_data = json.load(f)
                for fq in faqs_data:
                    faq_obj = FaqModel(
                        id=fq["id"],
                        question=fq["question"],
                        answer=fq["answer"],
                        category=fq["category"]
                    )
                    db.add(faq_obj)
                db.commit()

            # Load Testimonials
            test_file = os.path.join(seed_dir, "testimonials.json")
            if os.path.exists(test_file):
                with open(test_file, "r", encoding="utf-8") as f:
                    test_data = json.load(f)
                for t in test_data:
                    t_obj = TestimonialModel(
                        id=t["id"],
                        client_name=t["clientName"],
                        location=t["location"],
                        puppy_name=t["puppyName"],
                        quote=t["quote"],
                        image_url=t["imageUrl"]
                    )
                    db.add(t_obj)
                db.commit()

    except Exception as e:
        logger.error(f"Error during database initialization/seeding: {e}")
        db.rollback()
    finally:
        db.close()
