from pydantic import BaseModel, ConfigDict
from typing import Optional, List

class PuppyMediaSchema(BaseModel):
    id: str
    url: str
    kind: str = "image"
    width: Optional[int] = None
    height: Optional[int] = None
    alt_text: Optional[str] = ""
    display_order: int = 0

    model_config = ConfigDict(from_attributes=True)

class PuppyCoverSchema(BaseModel):
    url: str
    focalX: float = 0.5
    focalY: float = 0.5
    color: str = "#785838"

class PuppySummarySchema(BaseModel):
    id: str
    slug: str
    name: str
    displayName: str
    breed: str
    gender: str
    genderLabel: str
    age: str
    status: str
    featured: bool
    cover: PuppyCoverSchema

    model_config = ConfigDict(from_attributes=True)

class PuppyDetailSchema(PuppySummarySchema):
    colour: Optional[str] = ""
    description: Optional[str] = ""
    origin: Optional[str] = "local"
    media: List[PuppyMediaSchema] = []

    model_config = ConfigDict(from_attributes=True)
