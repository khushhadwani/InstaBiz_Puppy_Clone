import urllib.request
import re
import json

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
}

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        return resp.read()

# Fetch gone-home
try:
    gone_home_data = fetch("https://puppy.instabizweb.com/gone-home")
    with open("extracted_reference/pages/gone-home.html", "wb") as f:
        f.write(gone_home_data)
    print("Saved gone-home.html")
except Exception as e:
    print(f"Error fetching gone-home: {e}")

# Fetch puppy detail
try:
    detail_data = fetch("https://puppy.instabizweb.com/puppies/maltipoo-max-male")
    with open("extracted_reference/pages/puppy-detail-max.html", "wb") as f:
        f.write(detail_data)
    print("Saved puppy-detail-max.html")
except Exception as e:
    print(f"Error fetching detail: {e}")

# Check fonts in home.html
with open("extracted_reference/pages/home.html", "r", encoding="utf-8", errors="ignore") as f:
    home_html = f.read()

fonts = re.findall(r'fonts\.googleapis\.com[^\'"]+|fonts\.gstatic\.com[^\'"]+', home_html)
print("Google font links in HTML:", fonts)

font_faces = re.findall(r'@font-face\s*\{[^}]+\}', home_html)
print(f"Found {len(font_faces)} @font-face rules in HTML")

with open("extracted_reference/css/10jf32vdx50lp.css", "r", encoding="utf-8", errors="ignore") as f:
    css = f.read()
css_font_faces = re.findall(r'@font-face\s*\{[^}]+\}', css)
print(f"Found {len(css_font_faces)} @font-face rules in CSS")
for ff in css_font_faces[:5]:
    print("  ", ff)
