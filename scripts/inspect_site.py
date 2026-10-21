import os
import json
import re
import urllib.request
from urllib.parse import urljoin, urlparse

BASE_URL = "https://puppy.instabizweb.com"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9"
}

OUTPUT_DIR = "extracted_reference"
os.makedirs(f"{OUTPUT_DIR}/pages", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/css", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/js", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/images", exist_ok=True)

routes = [
    "/",
    "/puppies",
    "/happy-families",
    "/how-it-works",
    "/faq",
    "/contact",
    "/robots.txt",
    "/sitemap.xml"
]

all_discovered_links = set()
all_discovered_images = set()
all_css_urls = set()
all_js_urls = set()

def fetch_url(url):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
            return content, resp.status, resp.headers
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None, None, None

print("=== 1. FETCHING MAIN ROUTES ===")
for route in routes:
    url = urljoin(BASE_URL, route)
    print(f"Fetching route: {route} -> {url}")
    data, status, headers = fetch_url(url)
    if data:
        filename = "home.html" if route == "/" else route.strip("/").replace("/", "_")
        if not filename.endswith((".html", ".txt", ".xml")):
            filename += ".html"
        filepath = os.path.join(OUTPUT_DIR, "pages", filename)
        with open(filepath, "wb") as f:
            f.write(data)
        print(f"Saved {filepath} ({len(data)} bytes)")

        # parse HTML for links, images, css, js
        text = data.decode("utf-8", errors="ignore")
        # hrefs
        for m in re.finditer(r'href=["\']([^"\']+)["\']', text):
            href = m.group(1)
            if href.endswith(".css"):
                all_css_urls.add(urljoin(BASE_URL, href))
            elif href.startswith("/") or BASE_URL in href:
                all_discovered_links.add(urljoin(BASE_URL, href))
        # src
        for m in re.finditer(r'src=["\']([^"\']+)["\']', text):
            src = m.group(1)
            if src.endswith(".js"):
                all_js_urls.add(urljoin(BASE_URL, src))
            elif any(ext in src.lower() for ext in [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", "/_next/image"]):
                all_discovered_images.add(urljoin(BASE_URL, src))
        # srcset
        for m in re.finditer(r'srcSet=["\']([^"\']+)["\']', text):
            srcset = m.group(1)
            for part in srcset.split(","):
                u = part.strip().split(" ")[0]
                if u:
                    all_discovered_images.add(urljoin(BASE_URL, u))

print(f"\nDiscovered {len(all_discovered_links)} internal links:")
for l in sorted(all_discovered_links):
    print("  ", l)

print(f"\nDiscovered {len(all_css_urls)} CSS files:")
for c in sorted(all_css_urls):
    print("  ", c)
    c_data, _, _ = fetch_url(c)
    if c_data:
        c_name = os.path.basename(urlparse(c).path)
        with open(os.path.join(OUTPUT_DIR, "css", c_name), "wb") as f:
            f.write(c_data)

print(f"\nDiscovered {len(all_js_urls)} JS files:")
for j in sorted(all_js_urls):
    print("  ", j)
    j_data, _, _ = fetch_url(j)
    if j_data:
        j_name = os.path.basename(urlparse(j).path)
        with open(os.path.join(OUTPUT_DIR, "js", j_name), "wb") as f:
            f.write(j_data)

print(f"\nDiscovered {len(all_discovered_images)} images:")
for img in sorted(all_discovered_images):
    print("  ", img)

with open(os.path.join(OUTPUT_DIR, "manifest.json"), "w") as f:
    json.dump({
        "links": list(all_discovered_links),
        "css": list(all_css_urls),
        "js": list(all_js_urls),
        "images": list(all_discovered_images)
    }, f, indent=2)

print("\nDone inspect_site.py!")
