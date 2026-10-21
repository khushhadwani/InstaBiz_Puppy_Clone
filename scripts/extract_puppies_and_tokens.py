import json
import re

print("=== EXTRACTING PUPPY DATA AND DESIGN TOKENS ===")

with open("extracted_reference/puppies_stream.txt", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

# Let's inspect where puppy listings or arrays are defined in the text
# Look for patterns like {"id": or {"slug": or {"name":
# Let's find matches for "slug":"maltipoo-max-male"
idx = text.find("maltipoo-max-male")
if idx != -1:
    print(f"Found maltipoo-max-male at index {idx}")
    snippet = text[max(0, idx - 200): min(len(text), idx + 800)]
    print("Snippet around maltipoo-max-male:")
    print(snippet)

# Let's also check CSS tokens in extracted_reference/css/10jf32vdx50lp.css
with open("extracted_reference/css/10jf32vdx50lp.css", "r", encoding="utf-8", errors="ignore") as f:
    css_content = f.read()

# Find root variables or --* variables
variables = re.findall(r'--[a-zA-Z0-9_-]+:\s*[^;]+;', css_content)
print(f"\nFound {len(variables)} CSS variables:")
unique_vars = sorted(list(set(variables)))
for v in unique_vars[:30]:
    print("  ", v)

# Find font-family declarations
fonts = re.findall(r'font-family:\s*[^;]+;', css_content)
print(f"\nFound {len(fonts)} font-family declarations:")
for f_decl in sorted(list(set(fonts)))[:10]:
    print("  ", f_decl)

# Find key color codes
hex_colors = set(re.findall(r'#[0-9a-fA-F]{3,8}\b', css_content))
print(f"\nFound {len(hex_colors)} unique hex colors in CSS:")
print("Sample:", sorted(list(hex_colors))[:25])
