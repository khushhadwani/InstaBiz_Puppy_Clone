import re
import json

with open("extracted_reference/pages/puppy-detail-max.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

chunks = re.findall(r'self\.__next_f\.push\(\[1,\s*"((?:\\.|[^"\\])*)"\]\)', html)
stream = "".join([c.encode().decode('unicode_escape') for c in chunks])
with open("extracted_reference/max_stream.txt", "w", encoding="utf-8") as f:
    f.write(stream)

print(f"Max stream length: {len(stream)}")

# Let's search for "Max" or "maltipoo-max-male"
pos = stream.find("maltipoo-max-male")
if pos != -1:
    print("Found maltipoo-max-male at", pos)
    snippet = stream[max(0, pos-100): min(len(stream), pos+1500)]
    print(snippet)

# Let's inspect the sections in the detail page
with open("extracted_reference/pages/puppy-detail-max.html", "r", encoding="utf-8", errors="ignore") as f:
    # Look for headings, breadcrumbs, tags, price, details table
    headings = re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', html)
    print("Headings in detail page:", headings)
    buttons = re.findall(r'<button[^>]*>(.*?)</button>', html)
    print("Buttons in detail page:", buttons[:10])
    anchors = re.findall(r'<a[^>]*>(.*?)</a>', html)
    print("Sample anchors:", [re.sub('<[^<]+?>', '', a) for a in anchors[:15]])
