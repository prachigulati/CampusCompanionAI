import os
from typing import Annotated, TypedDict
from dotenv import load_dotenv

# Load environment variables FIRST before initializing any models
load_dotenv()

from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, ToolMessage
from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode
from langgraph.checkpoint.memory import MemorySaver

from app.tools import query_policy_guidelines, query_exam_seating, submit_leave_request

# Define the state for LangGraph
class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    user_id: str
    user_name: str
    user_role: str

TOOLS = [query_policy_guidelines, query_exam_seating, submit_leave_request]

# Initialize Azure OpenAI Chat model explicitly using environment variables
model = AzureChatOpenAI(
    azure_deployment=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT", "gpt-4o-mini"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2025-01-01-preview"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    temperature=0
).bind_tools(TOOLS)

# def call_model(state: AgentState):
#     messages = state["messages"]
#     user_name = state["user_name"]
#     user_role = state["user_role"]
    
#     system_prompt = (
#         f"You are Campus Companion AI, an intelligent, helpful university assistant. "
#         f"You are currently chatting with {user_name}, who has the role of '{user_role}'. "
#         f"CRITICAL RULE: Whenever a student asks about university rules, policies, medical leaves, placements, CGPA cutoffs, exams, or guidelines, "
#         f"you MUST call the `query_policy_guidelines` tool first to read the official document. Never answer policy questions from memory. "
#         f"If a student's question is vague, ask a clarifying cross-question. "
#         f"Once you have all required details for leaves, call `submit_leave_request`."
#     )
    
#     prompt = ChatPromptTemplate.from_messages([
#         ("system", system_prompt),
#         MessagesPlaceholder(variable_name="messages"),
#     ])
    
#     chained = prompt | model
#     response = chained.invoke({"messages": messages})
#     return {"messages": [response]}



def call_model(state: AgentState):
    messages = state["messages"]
    user_name = state["user_name"]
    user_role = state["user_role"]
    user_id = state["user_id"]
    
    system_prompt = (
        f"You are Campus Companion AI, an intelligent, helpful university assistant. "
        f"You are currently chatting with {user_name} (ID: {user_id}), who has the role of '{user_role}'. "
        f"You have access to tools including query_policy_guidelines (for registrar rules, medical/duty leave policies, examination schedules, and circulars), "
        f"query_exam_seating, and submit_leave_request. "
        f"Rule 1: Always use `query_policy_guidelines` when users ask about official rules, exam schedules, or university notices. "
        f"Rule 2: If a user asks a vague or incomplete question, ask active clarifying cross-questions. "
        f"Rule 3: Remember and retain all details the user provides across the conversation. "
        f"Once you have all required details (user ID, name, leave type, start date, end date, reason), call the submit_leave_request tool immediately. "
        f"Be polite, concise, and professional."
    )
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="messages"),
    ])
    
    chained = prompt | model
    response = chained.invoke({"messages": messages})
    return {"messages": [response]}



def should_continue(state: AgentState):
    messages = state["messages"]
    last_message = messages[-1]
    if isinstance(last_message, AIMessage) and last_message.tool_calls:
        return "tools"
    return END

# Build the LangGraph workflow with Memory Saver
workflow = StateGraph(AgentState)
workflow.add_node("agent", call_model)
workflow.add_node("tools", ToolNode(TOOLS))

workflow.set_entry_point("agent")
workflow.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
workflow.add_edge("tools", "agent")

# Initialize checkpointer memory so the graph remembers conversation history
memory = MemorySaver()
app_graph = workflow.compile(checkpointer=memory)