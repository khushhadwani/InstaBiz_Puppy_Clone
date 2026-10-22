import json
from pathlib import Path

puppies = json.load(open("extracted_reference/clean_puppies.json", encoding="utf-8"))
public_dir = Path("frontend/public")

total_media = 0
missing_media = []

for p in puppies:
    items = []
    if p.get("cover"):
        items.append(("cover", p["cover"]))
    for m in p.get("media", []):
        items.append(("media", m))
        
    for kind, item in items:
        url = item.get("url")
        if not url:
            continue
        total_media += 1
        rel_path = url.lstrip("/\\")
        full_path = public_dir / rel_path
        if not full_path.exists():
            missing_media.append((p["slug"], kind, url))

print(f"Total media items checked: {total_media}")
print(f"Total missing: {len(missing_media)}")
if missing_media:
    print("\nMissing items:")
    for slug, kind, url in missing_media:
        print(f"  [{slug}] {kind}: {url}")
else:
    print("ALL MEDIA FILES EXIST ON DISK!")
