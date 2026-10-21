import os
import json
import re

print("=== PARSING NEXT.JS DATA ===")

with open("extracted_reference/pages/puppies.html", "r", encoding="utf-8", errors="ignore") as f:
    puppies_html = f.read()

# Find all __next_f script segments
next_f_matches = re.findall(r'self\.__next_f\.push\(\[1,\s*"((?:\\.|[^"\\])*)"\]\)', puppies_html)
print(f"Found {len(next_f_matches)} __next_f chunks in puppies.html")

full_data_str = ""
for chunk in next_f_matches:
    # unescape python string
    chunk_decoded = chunk.encode().decode('unicode_escape')
    full_data_str += chunk_decoded

with open("extracted_reference/puppies_stream.txt", "w", encoding="utf-8") as f:
    f.write(full_data_str)
print(f"Wrote puppies_stream.txt ({len(full_data_str)} chars)")

# Let's search for JSON structures in puppies_stream.txt or keywords like 'maltipoo-max-male', 'price', etc.
with open("extracted_reference/pages/home.html", "r", encoding="utf-8", errors="ignore") as f:
    home_html = f.read()

home_chunks = re.findall(r'self\.__next_f\.push\(\[1,\s*"((?:\\.|[^"\\])*)"\]\)', home_html)
home_stream = ""
for c in home_chunks:
    home_stream += c.encode().decode('unicode_escape')
with open("extracted_reference/home_stream.txt", "w", encoding="utf-8") as f:
    f.write(home_stream)
print(f"Wrote home_stream.txt ({len(home_stream)} chars)")

print("Done parsing data stream!")
