import os
from typing import List
from dotenv import load_dotenv

load_dotenv()

class Settings:
    APP_NAME: str = os.getenv("APP_NAME", "TeddyPups U.A.E. API")
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Database connection string
    # Defaults to SQLite if DATABASE_URL is not provided or points to unconfigured local MySQL
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./teddypups.db")
    
    # CORS
    raw_cors: str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,*")
    CORS_ORIGINS: List[str] = [origin.strip() for origin in raw_cors.split(",") if origin.strip()]

settings = Settings()
