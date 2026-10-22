import re
import json
from pathlib import Path

with open("extracted_reference/puppies_stream.txt", "r", encoding="utf-8", errors="ignore") as f:
    s = f.read()

gender_positions = [m.start() for m in re.finditer(r'"genderLabel"', s)]

puppies = []
seen_slugs = set()

for pos in gender_positions:
    start = None
    for test_start in range(pos - 1, max(0, pos - 1000), -1):
        if s[test_start] == '{' and s[test_start:test_start+6] == '{"id":':
            start = test_start
            break
            
    if start is None:
        continue
        
    b_count = 0
    end = None
    for i in range(start, min(len(s), start + 30000)):
        if s[i] == '{':
            b_count += 1
        elif s[i] == '}':
            b_count -= 1
            if b_count == 0:
                end = i + 1
                break
                
    if end:
        chunk = s[start:end]
        try:
            obj = json.loads(chunk)
            if "slug" in obj and obj.get("slug"):
                slug = obj["slug"]
                if slug not in seen_slugs:
                    seen_slugs.add(slug)
                    
                    # Ensure name is friendly if blank
                    if not obj.get("name"):
                        obj["name"] = obj.get("displayName") or obj.get("breed") or slug.replace("-", " ").title()
                    if not obj.get("displayName"):
                        obj["displayName"] = obj["name"]
                        
                    puppies.append(obj)
        except Exception as e:
            print(f"Error parsing at {start}: {e}")

print(f"Extracted {len(puppies)} clean puppies.")

for i, p in enumerate(puppies):
    print(f"{i+1}. Slug: {p['slug']}")
    print(f"   Name: '{p.get('name')}', Display: '{p.get('displayName')}'")
    print(f"   Breed: '{p.get('breed')}', Breeds: {p.get('breeds')}")
    print(f"   Gender: '{p.get('gender')}', GenderLabel: '{p.get('genderLabel')}'")
    print(f"   Cover: {p.get('cover', {}).get('url')}")
    print(f"   Media count: {len(p.get('media', []))}")
    print()

# Save cleaned puppies to extracted_reference/clean_puppies.json
with open("extracted_reference/clean_puppies.json", "w", encoding="utf-8") as f:
    json.dump(puppies, f, indent=2)

print("Saved extracted_reference/clean_puppies.json")
