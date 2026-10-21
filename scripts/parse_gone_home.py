import re
import json

with open("extracted_reference/pages/gone-home.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

chunks = re.findall(r'self\.__next_f\.push\(\[1,\s*"((?:\\.|[^"\\])*)"\]\)', html)
stream = "".join([c.encode().decode('unicode_escape') for c in chunks])
with open("extracted_reference/gone_home_stream.txt", "w", encoding="utf-8") as f:
    f.write(stream)

slugs = re.findall(r'"slug":"([^"]+)"', stream)
print(f"Found {len(slugs)} slugs in gone_home_stream.txt")
unique_slugs = []
for sl in slugs:
    if sl not in unique_slugs:
        unique_slugs.append(sl)

print(f"Unique slugs in gone-home ({len(unique_slugs)}):")
for sl in unique_slugs:
    print("  -", sl)

puppies = {}
for sl in unique_slugs:
    pos = stream.find(f'"slug":"{sl}"')
    if pos != -1:
        start = stream.rfind('{"id":', 0, pos)
        if start != -1:
            b_count = 0
            end = start
            for i in range(start, min(len(stream), start + 12000)):
                if stream[i] == '{':
                    b_count += 1
                elif stream[i] == '}':
                    b_count -= 1
                    if b_count == 0:
                        end = i + 1
                        break
            chunk = stream[start:end]
            try:
                obj = json.loads(chunk)
                puppies[sl] = obj
            except Exception as e:
                print(f"Failed json loads for {sl}: {e}")

print(f"Successfully extracted {len(puppies)} gone-home puppy objects!")
with open("extracted_reference/gone_home_puppies.json", "w", encoding="utf-8") as f:
    json.dump(list(puppies.values()), f, indent=2)
