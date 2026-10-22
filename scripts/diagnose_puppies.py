import json
import os
from pathlib import Path

puppies_file = Path("frontend/src/data/puppies.json")
with open(puppies_file, "r", encoding="utf-8") as f:
    puppies = json.load(f)

public_dir = Path("frontend/public")

print(f"Total puppies: {len(puppies)}\n")

for i, p in enumerate(puppies):
    name = p.get("name") or p.get("displayName") or "UNKNOWN"
    slug = p.get("slug")
    breed = p.get("breed")
    breeds_arr = p.get("breeds")
    cover = p.get("cover")
    cover_url = cover.get("url") if isinstance(cover, dict) else None
    
    # Check if cover exists on disk
    exists = False
    if cover_url:
        # url usually starts with /
        rel_path = cover_url.lstrip("/\\")
        disk_path = public_dir / rel_path
        exists = disk_path.exists()
        
    media_count = len(p.get("media", []))
    
    print(f"[{i+1}] {name} (slug: {slug})")
    print(f"    breed: {breed} | breeds: {breeds_arr}")
    print(f"    cover_url: {cover_url}")
    print(f"    file_on_disk: {exists}")
    print(f"    media items: {media_count}")
    print("-" * 50)
