import os
import json
import urllib.request
from urllib.parse import urlparse, unquote

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
}

BASE_URL = "https://puppy.instabizweb.com"
MEDIA_DIR = "frontend/public/media"
BRAND_DIR = "frontend/public/brand"
os.makedirs(MEDIA_DIR, exist_ok=True)
os.makedirs(BRAND_DIR, exist_ok=True)

# 1. Download logo
logo_url = f"{BASE_URL}/brand/logo.png"
print(f"Downloading {logo_url}...")
try:
    req = urllib.request.Request(logo_url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        with open(os.path.join(BRAND_DIR, "logo.png"), "wb") as f:
            f.write(resp.read())
    print("Downloaded logo.png")
except Exception as e:
    print(f"Error downloading logo: {e}")

# 2. Download puppy images from all_puppies.json
with open("extracted_reference/all_puppies.json", "r", encoding="utf-8") as f:
    puppies = json.load(f)

downloaded = set()
for p in puppies:
    # cover
    cover_url = p.get("cover", {}).get("url")
    if cover_url:
        full_url = f"{BASE_URL}{cover_url}"
        rel_path = cover_url.lstrip("/") # e.g. media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp
        local_path = os.path.join("frontend/public", rel_path)
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        if not os.path.exists(local_path):
            try:
                req = urllib.request.Request(full_url, headers=HEADERS)
                with urllib.request.urlopen(req, timeout=10) as resp:
                    with open(local_path, "wb") as f:
                        f.write(resp.read())
                print(f"Downloaded cover: {rel_path}")
            except Exception as e:
                print(f"Error downloading {full_url}: {e}")

    # media list
    for m in p.get("media", []):
        m_url = m.get("url")
        if m_url and m_url not in downloaded:
            downloaded.add(m_url)
            full_url = f"{BASE_URL}{m_url}"
            rel_path = m_url.lstrip("/")
            local_path = os.path.join("frontend/public", rel_path)
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            if not os.path.exists(local_path):
                try:
                    req = urllib.request.Request(full_url, headers=HEADERS)
                    with urllib.request.urlopen(req, timeout=10) as resp:
                        with open(local_path, "wb") as f:
                            f.write(resp.read())
                    print(f"Downloaded media: {rel_path}")
                except Exception as e:
                    print(f"Error downloading {full_url}: {e}")

print("Done downloading key puppy assets!")
