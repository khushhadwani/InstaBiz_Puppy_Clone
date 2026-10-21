import re
import json

def parse_page(filepath, name):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()
    
    # Strip scripts, styles, svgs
    clean = re.sub(r'<script.*?</script>', '', html, flags=re.DOTALL)
    clean = re.sub(r'<style.*?</style>', '', clean, flags=re.DOTALL)
    clean = re.sub(r'<svg.*?</svg>', '', clean, flags=re.DOTALL)

    headings = re.findall(r'<h([1-6])[^>]*>(.*?)</h\1>', clean, flags=re.DOTALL)
    clean_headings = [(h[0], re.sub('<[^<]+?>', '', h[1]).strip()) for h in headings]
    
    # Extract paragraphs
    paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', clean, flags=re.DOTALL)
    clean_paras = [re.sub('<[^<]+?>', '', p).strip() for p in paragraphs if p.strip()]

    print(f"\n==================== {name.upper()} ====================")
    print(f"Total headings: {len(clean_headings)}")
    for lvl, text in clean_headings:
        print(f"  H{lvl}: {text}")
    print(f"Sample paragraphs ({len(clean_paras)} total):")
    for p in clean_paras[:8]:
        print(f"  - {p}")

    return {
        "headings": clean_headings,
        "paragraphs": clean_paras
    }

results = {}
results["home"] = parse_page("extracted_reference/pages/home.html", "Home")
results["puppies"] = parse_page("extracted_reference/pages/puppies.html", "Puppies")
results["happy_families"] = parse_page("extracted_reference/pages/happy-families.html", "Happy Families")
results["how_it_works"] = parse_page("extracted_reference/pages/how-it-works.html", "How It Works")
results["faq"] = parse_page("extracted_reference/pages/faq.html", "FAQ")
results["contact"] = parse_page("extracted_reference/pages/contact.html", "Contact")
results["gone_home"] = parse_page("extracted_reference/pages/gone-home.html", "Gone Home")

with open("extracted_reference/content_summary.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("\nDone extracting content summary!")
