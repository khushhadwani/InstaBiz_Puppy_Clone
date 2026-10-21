import re
import json

with open("extracted_reference/puppies_stream.txt", "r", encoding="utf-8", errors="ignore") as f:
    s = f.read()

slugs = re.findall(r'"slug":"([^"]+)"', s)
print(f"Found {len(slugs)} total slugs in puppies_stream.txt")
unique_slugs = []
for sl in slugs:
    if sl not in unique_slugs:
        unique_slugs.append(sl)

print(f"Unique slugs ({len(unique_slugs)}):")
for sl in unique_slugs:
    print("  -", sl)

# Let's inspect how objects are delimited in s
# Find each {"id":... around slug
puppies = {}
for sl in unique_slugs:
    pos = s.find(f'"slug":"{sl}"')
    if pos != -1:
        # scan backwards to find beginning '{'
        start = s.rfind('{"id":', 0, pos)
        if start != -1:
            # count braces to find closing '}'
            b_count = 0
            end = start
            for i in range(start, min(len(s), start + 12000)):
                if s[i] == '{':
                    b_count += 1
                elif s[i] == '}':
                    b_count -= 1
                    if b_count == 0:
                        end = i + 1
                        break
            chunk = s[start:end]
            try:
                obj = json.loads(chunk)
                puppies[sl] = obj
            except Exception as e:
                # print snippet to see why json loads failed
                print(f"Failed json loads for {sl}: {e}")
                # print chunk[:100], chunk[-100:]

print(f"\nSuccessfully extracted {len(puppies)} full puppy objects!")
with open("extracted_reference/all_puppies.json", "w", encoding="utf-8") as f:
    json.dump(list(puppies.values()), f, indent=2)

print("Saved extracted_reference/all_puppies.json")
