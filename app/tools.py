import os
import json
from langchain_core.tools import tool
from app.rag import search_policies

@tool
def query_policy_guidelines(query: str) -> str:
    """Search official university registrar policies and guidelines for medical leave, placements, and exams."""
    return search_policies(query)

@tool
def query_exam_seating(user_id: str, paper_code: str) -> str:
    """Look up exam hall block, room number, and seat assignment for a given student ID and paper."""
    path = os.path.join("data", "records.json")
    if not os.path.exists(path):
        return "Records database not found."
    with open(path, "r") as f:
        data = json.load(f)
    
    seating = data.get("exam_seating", {})
    user_seating = seating.get(user_id, {})
    if paper_code in user_seating:
        details = user_seating[paper_code]
        return f"Exam Seating Found - Block: {details['block']}, Room: {details['room']}, Seat: {details['seat']}"
    return f"No seating arrangement found for paper code '{paper_code}' under user ID {user_id}."

@tool
def submit_leave_request(user_id: str, user_name: str, leave_type: str, start_date: str, end_date: str, reason: str) -> str:
    """Submit a formal medical or duty leave request into the university records system."""
    path = os.path.join("data", "records.json")
    if not os.path.exists(path):
        return "Records database not found."
    
    with open(path, "r") as f:
        data = json.load(f)
    
    leaves = data.get("leaves", [])
    new_id = f"L00{len(leaves) + 1}"
    
    new_leave = {
        "leave_id": new_id,
        "user_id": user_id,
        "name": user_name,
        "type": leave_type,
        "start_date": start_date,
        "end_date": end_date,
        "reason": reason,
        "status": "pending"
    }
    
    leaves.append(new_leave)
    data["leaves"] = leaves
    
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
        
    return f"Leave request successfully submitted with ID {new_id}. Status is currently 'pending'."



from langchain_core.tools import tool
import os

@tool
def search_registrar_guidelines(query: str) -> str:
    """Search through official university registrar guidelines, leave policies, placement rules, and exam instructions.
    Use this when students ask about medical leaves, duty leaves, Tier-1 placement CGPA cutoffs, attendance requirements, or hall tickets.
    
    Args:
        query: The specific topic or keyword to search for (e.g. 'medical leave', 'CGPA cutoff', 'attendance').
    """
    path = os.path.join("docs", "policies", "registrar_guidelines.md")
    if not os.path.exists(path):
        return "Registrar guidelines document not found."
    
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Simple search filter to find relevant sections based on query keywords
    lines = content.split("\n")
    relevant_lines = [line for line in lines if query.lower() in line.lower()]
    
    if relevant_lines:
        return "\n".join(relevant_lines)
    
    # Fallback to returning the whole document if no specific keyword matches
    return content