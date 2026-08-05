# import os
# import json
# from fastapi import FastAPI, Header, HTTPException
# from fastapi.responses import HTMLResponse
# from fastapi.staticfiles import StaticFiles
# from pydantic import BaseModel
# from typing import Optional
# from dotenv import load_dotenv
# from langchain_core.messages import HumanMessage

# from app.agent import app_graph

# # Load environment variables from .env
# load_dotenv()

# app = FastAPI(title="Campus Companion AI")

# # Load users from data/users.json
# def load_users():
#     path = os.path.join("data", "users.json")
#     if os.path.exists(path):
#         with open(path, "r") as f:
#             return json.load(f)
#     return {}

# # Load records from data/records.json
# def load_records():
#     path = os.path.join("data", "records.json")
#     if os.path.exists(path):
#         with open(path, "r") as f:
#             return json.load(f)
#     return {"leave_requests": []}

# def save_records(data):
#     path = os.path.join("data", "records.json")
#     os.makedirs(os.path.dirname(path), exist_ok=True)
#     with open(path, "w") as f:
#         json.dump(data, f, indent=4)

# class ChatRequest(BaseModel):
#     message: str

# class LeaveRequestPayload(BaseModel):
#     type: str
#     subject: str
#     dateRange: str
#     totalDays: int
#     document: Optional[str] = "document.pdf"

# @app.get("/api/users")
# def get_users():
#     return load_users()

# @app.get("/api/leaves")
# def get_leaves():
#     records = load_records()
#     return records.get("leave_requests", [])

# @app.post("/api/leaves")
# def create_leave(req: LeaveRequestPayload):
#     records = load_records()
#     new_req = {
#         "id": len(records.get("leave_requests", [])) + 1,
#         "type": req.type,
#         "subject": req.subject,
#         "dateRange": req.dateRange,
#         "totalDays": req.totalDays,
#         "status": "Pending",
#         "credited": False,
#         "document": req.document
#     }
#     records.setdefault("leave_requests", []).append(new_req)
#     save_records(records)
#     return {"status": "success", "data": new_req}

# @app.post("/api/chat")
# def chat_endpoint(req: ChatRequest, x_user_id: str = Header(default="U001")):
#     users = load_users()
#     if x_user_id not in users:
#         raise HTTPException(status_code=400, detail="Invalid User ID")
    
#     current_user = users[x_user_id]
#     user_name = current_user["name"]
#     user_role = current_user["role"]

#     # Prepare input state for our LangGraph agent
#     initial_state = {
#         "messages": [HumanMessage(content=req.message)],
#         "user_id": x_user_id,
#         "user_name": user_name,
#         "user_role": user_role
#     }

#     try:
#         config = {"configurable": {"thread_id": x_user_id}}
#         result = app_graph.invoke(initial_state, config=config)
#         final_message = result["messages"][-1]
#         reply = final_message.content
#     except Exception as e:
#         reply = f"Error processing request with AI agent: {str(e)}"
    
#     return {"reply": reply}

# @app.get("/", response_class=HTMLResponse)
# def serve_frontend():
#     path = os.path.join("app", "index.html")
#     if os.path.exists(path):
#         with open(path, "r", encoding="utf-8") as f:
#             return f.read()
#     return "<h1>Frontend index.html not found!</h1>"



import os
import json
from fastapi import FastAPI, Header, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage

from app.agent import app_graph

# Load environment variables from .env
load_dotenv()

app = FastAPI(title="Campus Companion AI")

# Pydantic models for authentication and requests
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    user_id: str
    name: str
    email: str
    password: str
    role: str  # "student" or "teacher"
    department: Optional[str] = "Engineering"
    cgpa: Optional[float] = 0.0

class ChatRequest(BaseModel):
    message: str

class LeaveRequestPayload(BaseModel):
    type: str
    subject: str
    dateRange: str
    totalDays: int
    document: Optional[str] = "document.pdf"

# Load users safely from data/users.json
def load_users():
    path = os.path.join("data", "users.json")
    if os.path.exists(path):
        with open(path, "r") as f:
            content = f.read().strip()
            if not content:
                return {}
            data = json.loads(content)
            # If users.json is stored as a dictionary mapping user IDs or a list
            if isinstance(data, dict) and "users" in data:
                # Convert list or map safely
                if isinstance(data["users"], list):
                    return {u.get("user_id", f"U00{i}"): u for i, u in enumerate(data["users"])}
                return data["users"]
            return data
    return {}

# Load records from data/records.json
def load_records():
    path = os.path.join("data", "records.json")
    if os.path.exists(path):
        with open(path, "r") as f:
            content = f.read().strip()
            if not content:
                return {"leave_requests": []}
            return json.loads(content)
    return {"leave_requests": []}

def save_records(data):
    path = os.path.join("data", "records.json")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=4)

# Authentication Endpoints
@app.post("/api/auth/login")
def login(data: LoginRequest):
    users_path = os.path.join("data", "users.json")
    if not os.path.exists(users_path):
        raise HTTPException(status_code=404, detail="User database not found")
        
    with open(users_path, "r") as f:
        content = f.read().strip()
        db = json.loads(content) if content else {}
        
    users = db.get("users", db) if isinstance(db, dict) else db
    if isinstance(users, dict):
        users_list = list(users.values())
    elif isinstance(users, list):
        users_list = users
    else:
        users_list = []
        
    user = next((u for u in users_list if u.get("email") == data.email and u.get("password") == data.password), None)
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    user_profile = {k: v for k, v in user.items() if k != "password"}
    return {"status": "success", "user": user_profile}

@app.post("/api/auth/register")
def register(data: RegisterRequest):
    users_path = os.path.join("data", "users.json")
    os.makedirs("data", exist_ok=True)
    
    if os.path.exists(users_path):
        with open(users_path, "r") as f:
            content = f.read().strip()
            db = json.loads(content) if content else {}
    else:
        db = {"users": []}
        
    users = db.get("users", db) if isinstance(db, dict) else db
    if not isinstance(users, list):
        users = list(users.values()) if isinstance(users, dict) else []
        
    if any(u.get("email") == data.email for u in users):
        raise HTTPException(status_code=400, detail="Email already registered")
        
    new_user = data.dict()
    users.append(new_user)
    
    output_data = {"users": users} if isinstance(db, dict) else users
    with open(users_path, "w") as f:
        json.dump(output_data, f, indent=4)
        
    user_profile = {k: v for k, v in new_user.items() if k != "password"}
    return {"status": "success", "user": user_profile}

@app.get("/api/users")
def get_users():
    return load_users()

@app.get("/api/leaves")
def get_leaves():
    records = load_records()
    return records.get("leave_requests", [])

@app.post("/api/leaves")
def create_leave(req: LeaveRequestPayload):
    records = load_records()
    new_req = {
        "id": len(records.get("leave_requests", [])) + 1,
        "type": req.type,
        "subject": req.subject,
        "dateRange": req.dateRange,
        "totalDays": req.totalDays,
        "status": "Pending",
        "credited": False,
        "document": req.document
    }
    records.setdefault("leave_requests", []).append(new_req)
    save_records(records)
    return {"status": "success", "data": new_req}

@app.post("/api/chat")
def chat_endpoint(req: ChatRequest, x_user_id: str = Header(default="U001")):
    users = load_users()
    
    # Handle list vs dict structure for user lookup
    current_user = None
    if isinstance(users, dict):
        if x_user_id in users:
            current_user = users[x_user_id]
        else:
            current_user = next((u for u in users.values() if u.get("user_id") == x_user_id), None)
    elif isinstance(users, list):
        current_user = next((u for u in users if u.get("user_id") == x_user_id), None)

    if not current_user:
        raise HTTPException(status_code=400, detail="Invalid User ID")
    
    user_name = current_user.get("name", current_user.get("username", "Student"))
    user_role = current_user.get("role", "student")

    initial_state = {
        "messages": [HumanMessage(content=req.message)],
        "user_id": x_user_id,
        "user_name": user_name,
        "user_role": user_role
    }

    try:
        config = {"configurable": {"thread_id": x_user_id}}
        result = app_graph.invoke(initial_state, config=config)
        final_message = result["messages"][-1]
        reply = final_message.content
    except Exception as e:
        reply = f"Error processing request with AI agent: {str(e)}"
    
    return {"reply": reply}

@app.get("/", response_class=HTMLResponse)
def serve_frontend():
    path = os.path.join("app", "index.html")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>Frontend index.html not found!</h1>"


@app.get("/api/attendance/{user_id}")
def get_attendance(user_id: str):
    records = load_records()
    attendance_data = records.get("attendance", {})
    return attendance_data.get(user_id, [])


class TimelineDocPayload(BaseModel):
    title: str
    category: str
    uploaded_by: str
    content: str

@app.get("/api/timeline")
def get_timeline():
    records = load_records()
    return records.get("timeline_documents", [])

@app.post("/api/timeline")
def add_timeline_doc(doc: TimelineDocPayload):
    records = load_records()
    new_doc = {
        "doc_id": f"DOC00{len(records.get('timeline_documents', [])) + 1}",
        "title": doc.title,
        "category": doc.category,
        "uploaded_by": doc.uploaded_by,
        "date": "2026-08-04",
        "content": doc.content
    }
    records.setdefault("timeline_documents", []).append(new_doc)
    save_records(records)

    # Optionally append this new content directly to your RAG markdown file so the AI can search it instantly!
    doc_path = os.path.join("docs", "policies", "registrar_guidelines.md")
    os.makedirs(os.path.dirname(doc_path), exist_ok=True)
    with open(doc_path, "a", encoding="utf-8") as f:
        f.write(f"\n\n### {doc.title} ({doc.category})\n{doc.content}\n")

    return {"status": "success", "data": new_doc}