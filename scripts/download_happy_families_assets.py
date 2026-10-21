import os
import re
import urllib.request

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
}
BASE_URL = "https://puppy.instabizweb.com"

with open("extracted_reference/pages/happy-families.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

media_urls = set(re.findall(r'(/media/[^"\'\s&]+)', html))
print(f"Found {len(media_urls)} media URLs in happy-families.html")

for m in media_urls:
    full_url = f"{BASE_URL}{m}"
    rel_path = m.lstrip("/")
    local_path = os.path.join("frontend/public", rel_path)
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    if not os.path.exists(local_path):
        try:
            req = urllib.request.Request(full_url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=10) as resp:
                with open(local_path, "wb") as f:
                    f.write(resp.read())
            print(f"Downloaded: {rel_path}")
        except Exception as e:
            print(f"Error {m}: {e}")

print("Done happy families asset downloads!")
