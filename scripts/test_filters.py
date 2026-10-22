import json

puppies = json.load(open("extracted_reference/clean_puppies.json", encoding="utf-8"))

filter_keys = ['maltipoo', 'korean-teacup', 'poodle', 'pomeranian', 'shih-tzu', 'cavapoo']

for fkey in filter_keys:
    matches = []
    for p in puppies:
        b = (p.get("breed") or "").lower()
        slug = (p.get("slug") or "").lower()
        name = (p.get("name") or "").lower()
        breed_slugs = [br.get("slug", "").lower() for br in p.get("breeds") or []]
        
        match = False
        if fkey == 'maltipoo':
            match = 'maltipoo' in b or 'maltipoo' in breed_slugs
        elif fkey == 'korean-teacup':
            match = 'korean' in b or 'korean' in slug or 'korean' in name
        elif fkey == 'poodle':
            match = 'poodle' in b or 'poodle' in breed_slugs
        elif fkey == 'pomeranian':
            match = 'pomeranian' in b or 'pomeranian' in breed_slugs
        elif fkey == 'shih-tzu':
            match = 'shih' in b or 'shitzu' in b or 'shitzu' in slug or 'shih-tzu' in breed_slugs
        elif fkey == 'cavapoo':
            match = 'cavapoo' in b or 'cavapoo' in breed_slugs
            
        if match:
            matches.append(p["slug"])
            
    print(f"Filter [{fkey}]: {len(matches)} puppies -> {matches}")
