from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.ai import router as ai_router
from app.api.documents import router as document_router
from app.database.mongodb import client


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        client.admin.command("ping")
        print("✅ Connected to MongoDB successfully!")
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")

    yield

    print("🛑 Application shutting down...")


app = FastAPI(
    title="AI Customer Support SaaS API",
    version="1.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://ai-customer-support-saas-vhtx.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(ai_router)
app.include_router(document_router)


@app.get("/")
def home():
    return {
        "message": "AI Customer Support SaaS API is running"
    }