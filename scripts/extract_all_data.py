import json
import re

print("=== PARSING FULL SITE DATA ===")

with open("extracted_reference/puppies_stream.txt", "r", encoding="utf-8", errors="ignore") as f:
    puppies_stream = f.read()

# Find the puppies array
# In the snippet: es:[{"id":...
match = re.search(r'(\[\{"id":"[0-9a-f-]{36}","slug":.*?\])(?:,\$|\,"filter|\,"pagination|\,"selected)', puppies_stream)
if not match:
    # Try alternate regex
    match = re.search(r'\[\{"id":"[0-9a-f-]{36}","slug":.*?\}\](?=,\$|,\{|,\")', puppies_stream)

puppies = []
if match:
    raw_json = match.group(0)
    print(f"Matched raw puppies JSON length: {len(raw_json)}")
    try:
        puppies = json.loads(raw_json)
        print(f"Successfully parsed {len(puppies)} puppies via JSON loads!")
    except Exception as e:
        print(f"JSON loads failed: {e}. Trying iterative extraction.")

if not puppies:
    # Iterative extraction of puppy objects
    pattern = r'\{"id":"([0-9a-f-]{36})","slug":"([^"]+)","name":"([^"]+)"'
    for m in re.finditer(pattern, puppies_stream):
        start = m.start()
        # Find closing matching brace
        brace_count = 0
        end = start
        for i in range(start, min(len(puppies_stream), start + 8000)):
            if puppies_stream[i] == '{':
                brace_count += 1
            elif puppies_stream[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end = i + 1
                    break
        obj_str = puppies_stream[start:end]
        try:
            p_obj = json.loads(obj_str)
            puppies.append(p_obj)
        except Exception as e:
            pass
    print(f"Iteratively parsed {len(puppies)} puppies!")

# Remove duplicates by id or slug
unique_puppies = {}
for p in puppies:
    if p.get("slug") and p["slug"] not in unique_puppies:
        unique_puppies[p["slug"]] = p

puppy_list = list(unique_puppies.values())
print(f"Total unique puppies: {len(puppy_list)}")

with open("extracted_reference/puppies.json", "w", encoding="utf-8") as f:
    json.dump(puppy_list, f, indent=2)

# Also let's check happy-families stream
with open("extracted_reference/pages/happy-families.html", "r", encoding="utf-8", errors="ignore") as f:
    hf_html = f.read()
hf_chunks = re.findall(r'self\.__next_f\.push\(\[1,\s*"((?:\\.|[^"\\])*)"\]\)', hf_html)
hf_stream = "".join([c.encode().decode('unicode_escape') for c in hf_chunks])
with open("extracted_reference/happy_families_stream.txt", "w", encoding="utf-8") as f:
    f.write(hf_stream)

# Check faq stream
with open("extracted_reference/pages/faq.html", "r", encoding="utf-8", errors="ignore") as f:
    faq_html = f.read()
faq_chunks = re.findall(r'self\.__next_f\.push\(\[1,\s*"((?:\\.|[^"\\])*)"\]\)', faq_html)
faq_stream = "".join([c.encode().decode('unicode_escape') for c in faq_chunks])
with open("extracted_reference/faq_stream.txt", "w", encoding="utf-8") as f:
    f.write(faq_stream)

# Check how-it-works stream
with open("extracted_reference/pages/how-it-works.html", "r", encoding="utf-8", errors="ignore") as f:
    hiw_html = f.read()
hiw_chunks = re.findall(r'self\.__next_f\.push\(\[1,\s*"((?:\\.|[^"\\])*)"\]\)', hiw_html)
hiw_stream = "".join([c.encode().decode('unicode_escape') for c in hiw_chunks])
with open("extracted_reference/how_it_works_stream.txt", "w", encoding="utf-8") as f:
    f.write(hiw_stream)

print("Done extract_all_data.py!")
