import os
import json

USERS_FILE = os.path.join("data", "users.json")

def init_db():
    os.makedirs("data", exist_ok=True)
    if not os.path.exists(USERS_FILE):
        # Default mock users for testing student and teacher logins
        initial_data = {
            "users": [
                {
                    "user_id": "STU001",
                    "username": "Prachi",
                    "email": "prachi@chitkara.edu.in",
                    "password": "password123", # In production, hash this!
                    "role": "student",
                    "cgpa": 8.2,
                    "department": "Engineering"
                },
                {
                    "user_id": "TCH001",
                    "username": "Dr. Sharma",
                    "email": "sharma@chitkara.edu.in",
                    "password": "password123",
                    "role": "teacher",
                    "department": "Computer Science"
                }
            ]
        }
        with open(USERS_FILE, "w") as f:
            json.dump(initial_data, f, indent=2)

# Initialize the database file immediately
init_db()