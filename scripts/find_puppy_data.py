import json
import re

with open("extracted_reference/puppies_stream.txt", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

# Let's inspect PuppyBrowser props or search for puppy data objects.
# Let's search for "PuppyBrowser"
pos = text.find("PuppyBrowser")
if pos != -1:
    print(f"PuppyBrowser found at {pos}")
    print(text[pos:pos+1500])

# Let's find any large JSON array or props passed to PuppyBrowser
# Look for pattern where puppy list starts
# Let's search for all occurrences of "slug":"
slug_matches = [m.start() for m in re.finditer(r'"slug"\s*:\s*"', text)]
print(f"Found {len(slug_matches)} occurrences of 'slug':")

# Let's check one puppy object
if slug_matches:
    first_idx = slug_matches[0]
    print("Around first slug:")
    print(text[max(0, first_idx-50): min(len(text), first_idx+800)])
