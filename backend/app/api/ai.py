from fastapi import APIRouter, HTTPException

from app.schemas.chat_schema import ChatRequest
from app.services.openai_service import OpenAIService

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)

ai_service = OpenAIService()

@router.post("/chat")
def chat(request: ChatRequest):
    try:
        reply = ai_service.chat(request.message)

        return {
            "user_message": request.message,
            "ai_response": reply,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )