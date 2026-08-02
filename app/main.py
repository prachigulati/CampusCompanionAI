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

# Load users from data/users.json
def load_users():
    path = os.path.join("data", "users.json")
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return {}

# Load records from data/records.json
def load_records():
    path = os.path.join("data", "records.json")
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return {"leave_requests": []}

def save_records(data):
    path = os.path.join("data", "records.json")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=4)

class ChatRequest(BaseModel):
    message: str

class LeaveRequestPayload(BaseModel):
    type: str
    subject: str
    dateRange: str
    totalDays: int
    document: Optional[str] = "document.pdf"

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
    if x_user_id not in users:
        raise HTTPException(status_code=400, detail="Invalid User ID")
    
    current_user = users[x_user_id]
    user_name = current_user["name"]
    user_role = current_user["role"]

    # Prepare input state for our LangGraph agent
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