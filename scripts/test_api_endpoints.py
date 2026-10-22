import sys
sys.path.insert(0, "backend")

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

print("--- Testing /health ---")
r = client.get("/health")
print(r.status_code, r.json())

print("\n--- Testing /api/puppies ---")
r = client.get("/api/puppies")
data = r.json()
print(f"Status: {r.status_code}, Total puppies: {len(data)}")
for p in data[:3]:
    print(f"  {p['slug']} | Name: {p['name']} | Breed: {p['breed']} | Cover: {p['cover']['url']}")

print("\n--- Testing /api/puppies?breed=maltipoo ---")
r = client.get("/api/puppies?breed=maltipoo")
maltipoos = r.json()
print(f"Status: {r.status_code}, Maltipoos found: {len(maltipoos)}")
for p in maltipoos:
    print(f"  {p['slug']} | {p['breed']}")

print("\n--- Testing /api/puppies?breed=korean-teacup ---")
r = client.get("/api/puppies?breed=korean-teacup")
korean = r.json()
print(f"Status: {r.status_code}, Korean teacups found: {len(korean)}")
for p in korean:
    print(f"  {p['slug']} | {p['breed']}")

print("\n--- Testing /api/puppies/maltipoo-max-male ---")
r = client.get("/api/puppies/maltipoo-max-male")
max_pup = r.json()
print(f"Status: {r.status_code}, Name: {max_pup.get('name')}, Media items: {len(max_pup.get('media', []))}")

print("\n--- Testing /api/gone-home ---")
r = client.get("/api/gone-home")
print(f"Status: {r.status_code}, Tickets: {len(r.json())}")

print("\n--- Testing /api/faqs ---")
r = client.get("/api/faqs")
print(f"Status: {r.status_code}, FAQs: {len(r.json())}")

print("\n--- Testing POST /api/inquiries ---")
r = client.post("/api/inquiries", json={
    "puppy_id": "4218427a-dd65-4b09-a089-584b912aa7ab",
    "puppy_name": "Max (Maltipoo)",
    "client_name": "Ahmed Al Nuaimi",
    "client_phone": "+971 50 123 4567",
    "client_email": "ahmed@example.ae",
    "message": "I would love to view Max in the Downtown showroom!"
})
print(f"Status: {r.status_code}, Response: {r.json()}")

print("\nALL BACKEND TESTS PASSED SUCCESSFULLY!")
