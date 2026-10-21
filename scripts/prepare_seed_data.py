import json
import os
import re

os.makedirs("frontend/src/data", exist_ok=True)
os.makedirs("backend/app/database", exist_ok=True)

# 1. Puppies
with open("extracted_reference/all_puppies.json", "r", encoding="utf-8") as f:
    puppies = json.load(f)

print(f"Loaded {len(puppies)} puppies")

# 2. FAQs
faqs = [
    {
        "id": "faq-1",
        "question": "Are your puppies vaccinated and health-checked?",
        "answer": "Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.",
        "category": "Health & Care"
    },
    {
        "id": "faq-2",
        "question": "Can I meet a puppy before I decide?",
        "answer": "Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.",
        "category": "Adoption Process"
    },
    {
        "id": "faq-3",
        "question": "Can I take my puppy home the same day?",
        "answer": "Local puppies are available immediately, so you can take your puppy home the same day.",
        "category": "Adoption Process"
    },
    {
        "id": "faq-4",
        "question": "Do you import puppies from abroad?",
        "answer": "Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the entire import for you.",
        "category": "Import & Delivery"
    },
    {
        "id": "faq-5",
        "question": "How does an imported puppy travel to Dubai?",
        "answer": "Imported puppies travel safely via certified international pet cargo in temperature-controlled environments. All customs clearance, veterinary health checks, and quarantine requirements are managed by our concierge team.",
        "category": "Import & Delivery"
    },
    {
        "id": "faq-6",
        "question": "Will I see photos and health details first?",
        "answer": "Absolutely. Before any commitment, we share comprehensive high-resolution videos, photos, veterinary health certificates, microchip registration, and pedigree paperwork.",
        "category": "Adoption Process"
    },
    {
        "id": "faq-7",
        "question": "Do you deliver?",
        "answer": "Yes! We offer personal VIP white-glove doorstep delivery anywhere across Dubai and all other Emirates in the UAE, as well as worldwide shipping to select international destinations.",
        "category": "Import & Delivery"
    },
    {
        "id": "faq-8",
        "question": "Which breeds do you usually have?",
        "answer": "We specialize in miniature, teacup, and teddy bear breeds including Korean Teacup Maltipoos, Toy Poodles, Teacup Pomeranians, Cavapoos, Shih Tzus, and Bichon Frises.",
        "category": "Breeds & Availability"
    },
    {
        "id": "faq-9",
        "question": "Is there help after my puppy comes home?",
        "answer": "Yes, our dedicated pet care concierge team provides 24/7 post-adoption assistance covering nutrition, training routines, veterinary advice, and grooming recommendations.",
        "category": "Health & Care"
    }
]

# 3. Gone Home Puppies (Tickets)
gone_home_puppies = [
    {"slug": "pomeranian-ace-boy", "name": "Ace", "breed": "Pomeranian", "gender": "boy", "coverUrl": "/media/mihUKGFCatU3/0461cca56e/27b888_bac41adfadc44dce846a1c3fd0cdb0de-mv2.avif"},
    {"slug": "poodle-leo-male", "name": "Leo", "breed": "Poodle", "gender": "boy", "coverUrl": "/media/QgFG5s09n-ss/81af626d2d/27b888_5f9a7189bb21477d832047aae2040921-mv2.avif"},
    {"slug": "maltipoo-mia-girl", "name": "Mia", "breed": "Maltipoo", "gender": "girl", "coverUrl": "/media/4vu6_PGfL64H/537c367d85/27b888_747a4667fec640c69aad9bc045d61ac6-mv2.avif"},
    {"slug": "maltipoo-sadie-girl", "name": "Sadie", "breed": "Maltipoo", "gender": "girl", "coverUrl": "/media/159oT4F46uhk/b66c2be87f/27b888_ea6e7e0fcd43447d854657b6de98d4cb-mv2.avif"},
    {"slug": "blue-marle-pomeranian", "name": "Blue", "breed": "Pomeranian", "gender": "boy", "coverUrl": "/media/bMSEHnYcBTFF/970fdc1ee6/27b888_5e612a215bf343328c08d99e0e9c5a37-mv2.avif"},
    {"slug": "pomsky-ollie-boy", "name": "Ollie", "breed": "Pomsky", "gender": "boy", "coverUrl": "/media/Qs2IHRk7OQIm/c16bea255c/27b888_ef3324a358d64858b4873a146574c3b9-mv2.avif"},
    {"slug": "maltipoo-bruno-boy", "name": "Bruno", "breed": "Maltipoo", "gender": "boy", "coverUrl": "/media/w-F8mJLs2gtj/f06147a6d3/27b888_301f58cbae624a1da36a79d46571043a-mv2.avif"},
    {"slug": "maltese-buddy-male", "name": "Buddy", "breed": "Maltese", "gender": "boy", "coverUrl": "/media/5ygCaO2TQb3v/f23ade89fa/27b888_6053b478acb641d1865de22aef938977-mv2.avif"},
    {"slug": "maltese-charlie-male", "name": "Charlie", "breed": "Maltese", "gender": "boy", "coverUrl": "/media/0c1rFiKXQLLk/75c6a20e15/27b888_b22287e7c1594de7ab2fba46eabea376-mv2.avif"},
    {"slug": "pomeranian-daisy-girl", "name": "Daisy", "breed": "Pomeranian", "gender": "girl", "coverUrl": "/media/d_ji2d9LVy0R/b19b4cf1c2/27b888_c6cbb607448f469a96d73f3bc42a992d-mv2.avif"},
    {"slug": "pomeranian-bella-female", "name": "Bella", "breed": "Pomeranian", "gender": "girl", "coverUrl": "/media/9jwfs8kSZW7K/9b8ae31d11/27b888_ab014eabe44c4f6ebaacb9ef1869823f-mv2.avif"},
    {"slug": "poodle-teddy-male", "name": "Teddy", "breed": "Poodle", "gender": "boy", "coverUrl": "/media/9XFYXsuvjIcz/8d1efc8baa/27b888_430ebbf87dc84b93bcd0b61709a2eaa7-mv2.avif"},
    {"slug": "poodle-molly-female", "name": "Molly", "breed": "Poodle", "gender": "girl", "coverUrl": "/media/WZKcpiogRBW7/9ebcb8d165/27b888_2b9e32b056624a45b62f7d7b4ec7d105-mv2.avif"},
    {"slug": "pomski-coco-girl", "name": "Coco", "breed": "Pomsky", "gender": "girl", "coverUrl": "/media/CXIzj6hYrmuI/eff60812df/27b888_ce94335cf4714a99a78c799f666f9323-mv2.avif"},
    {"slug": "pomsky-rosie-girl", "name": "Rosie", "breed": "Pomsky", "gender": "girl", "coverUrl": "/media/FhrW7pE84bji/f7c57baf49/27b888_08271c7de284451fb9c848757f4838fb-mv2.avif"},
    {"slug": "pomeranian-leo-boy", "name": "Leo", "breed": "Pomeranian", "gender": "boy", "coverUrl": "/media/5iCniMJshKud/8bfe42003c/27b888_84815fae2bd34283a7c79985cfc8b568-mv2.avif"},
    {"slug": "poodle-rocky-boy", "name": "Rocky", "breed": "Poodle", "gender": "boy", "coverUrl": "/media/51aMfxO7oeVe/6b70c96b1e/27b888_77a51d530b694ba58bc207f2a23e8620-mv2.avif"},
    {"slug": "maltipoo-sophie-girl", "name": "Sophie", "breed": "Maltipoo", "gender": "girl", "coverUrl": "/media/PYYTxpqgo76_/ae53ae6d3c/27b888_0d89c05fa55c43d4b6d55d573be83e73-mv2.avif"},
    {"slug": "maltipoo-lola-girl", "name": "Lola", "breed": "Maltipoo", "gender": "girl", "coverUrl": "/media/HPs4cYizPzy9/22b104e2c5/27b888_f24865b2456b46feb6ea6694fe90660f-mv2.avif"},
    {"slug": "pomeranian-rex-boy", "name": "Rex", "breed": "Pomeranian", "gender": "boy", "coverUrl": "/media/QIIvMqQTe9jr/d997ae172e/27b888_14fd6ec24bd94522bd54a5ae345240b8-mv2.avif"},
    {"slug": "pomsky-finn-male", "name": "Finn", "breed": "Pomsky", "gender": "boy", "coverUrl": "/media/tEAwWspMD8iG/1f55440daf/27b888_c68794a6e9ee442abb522a1d88a1e8cd-mv2.avif"},
    {"slug": "maltipoo-zoe-girl", "name": "Zoe", "breed": "Maltipoo", "gender": "girl", "coverUrl": "/media/fxj_9aZOSxQM/90c10b9c91/27b888_89e442e0035442308fc87fe3d2837f1d-mv2.avif"},
    {"slug": "pomeranian-mimi-girl", "name": "Mimi", "breed": "Pomeranian", "gender": "girl", "coverUrl": "/media/BLOZLPixUcjE/ea8ee97fd9/27b888_870c748ca6ee45cf8e0a311232dfe289-mv2.avif"},
    {"slug": "bichon-bailey-boy", "name": "Bailey", "breed": "Bichon", "gender": "boy", "coverUrl": "/media/fI-hlHuSwrRw/e5ae9b6384/27b888_8d87239e23854214a8718ef8f02c2d50-mv2.avif"}
]

# 4. Testimonials / Happy Families
testimonials = [
    {
        "id": "fam-1",
        "clientName": "Sarah & Omar",
        "location": "Palm Jumeirah, Dubai",
        "puppyName": "Mochi (Maltipoo)",
        "quote": "Bringing Mochi home was the best decision we ever made. The team at TeddyPups made the process so warm and seamless!",
        "imageUrl": "/media/xaIi_2gMoj_N/27123a3e2c/27b888_3375199e717a4f6ca02e902672664e79-mv2.jpg"
    },
    {
        "id": "fam-2",
        "clientName": "The Al Maktoum Family",
        "location": "Downtown Dubai",
        "puppyName": "Bella (Teacup Pomeranian)",
        "quote": "Bella is an absolute angel. Healthy, active, and so loving. Thank you TeddyPups for our newest family member!",
        "imageUrl": "/media/yEfM9sdMluCX/46ecd570ef/edb2f5_099acc542ba14359aa8c0f933cb4ef2c-mv2.jpeg"
    },
    {
        "id": "fam-3",
        "clientName": "Elena & David",
        "location": "Dubai Marina",
        "puppyName": "Coco (Toy Poodle)",
        "quote": "From our visit to the Downtown showroom to the home delivery, the white-glove service was top tier.",
        "imageUrl": "/media/xHEMhVTwflC_/8859dd626c/b942a5_65113182432144f49bd50bb009e7d88c-mv2.jpg"
    },
    {
        "id": "fam-4",
        "clientName": "Rashid K.",
        "location": "Jumeirah Golf Estates",
        "puppyName": "Teddy (Cavapoo)",
        "quote": "Our Korean import arrived safely with all paperwork, passports, and health checks completely in order.",
        "imageUrl": "/media/wyDhW6yEQ6ef/e012615aab/b942a5_9381a9a0ca3e40b4b4f31906cf7fda56-mv2.png"
    }
]

# 5. Site Config
site_config = {
    "brandName": "TeddyPups U.A.E.",
    "tagline": "Premium teacup puppies in Dubai",
    "motto": "every puppy is family",
    "phone": "+971 54 167 6733",
    "whatsappNumber": "971541676733",
    "email": "teddypupsadmin@gmail.com",
    "address": "Downtown Dubai, United Arab Emirates",
    "showroomHours": "Monday – Sunday: 10:00 AM – 10:00 PM",
    "social": {
        "instagram": "https://instagram.com/teddypups_uae",
        "whatsapp": "https://wa.me/971541676733"
    }
}

# Write to frontend and backend
for path in ["frontend/src/data", "backend/app/database"]:
    with open(f"{path}/puppies.json", "w", encoding="utf-8") as f:
        json.dump(puppies, f, indent=2)
    with open(f"{path}/faqs.json", "w", encoding="utf-8") as f:
        json.dump(faqs, f, indent=2)
    with open(f"{path}/goneHome.json", "w", encoding="utf-8") as f:
        json.dump(gone_home_puppies, f, indent=2)
    with open(f"{path}/testimonials.json", "w", encoding="utf-8") as f:
        json.dump(testimonials, f, indent=2)
    with open(f"{path}/siteConfig.json", "w", encoding="utf-8") as f:
        json.dump(site_config, f, indent=2)

print("Seed data successfully created in frontend/src/data and backend/app/database!")
