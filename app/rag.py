import os
from dotenv import load_dotenv
load_dotenv()

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import MarkdownHeaderTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import AzureOpenAIEmbeddings

def get_vector_store():
    policy_path = os.path.join("docs", "policies", "registrar_guidelines.md")
    if not os.path.exists(policy_path):
        return None

    # Load and split the markdown file by headers
    loader = TextLoader(policy_path, encoding="utf-8")
    docs = loader.load()
    
    headers_to_split_on = [
        ("#", "Header 1"),
        ("##", "Header 2"),
    ]
    splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers_to_split_on)
    split_docs = []
    for doc in docs:
        splits = splitter.split_text(doc.page_content)
        split_docs.extend(splits)

    # Use Azure OpenAI Embeddings
    embeddings = AzureOpenAIEmbeddings(
        azure_deployment="text-embedding-3-small",  # Or your deployment name for embeddings
        api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2025-01-01-preview"),
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY")
    )
    
    # Create a local Chroma vector store in memory
    vectorstore = Chroma.from_documents(split_docs, embeddings)
    return vectorstore

def search_policies(query: str) -> str:
    vectorstore = get_vector_store()
    if not vectorstore:
        return "Policy documents not found."
    
    results = vectorstore.similarity_search(query, k=2)
    return "\n\n".join([doc.page_content for doc in results])