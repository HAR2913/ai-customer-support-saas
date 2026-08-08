from openai import OpenAI
from app.core.config import settings
from app.services.rag_service import RAGService


class OpenAIService:

    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.rag = RAGService()

    def chat(self, message: str):

        docs = self.rag.search(message)

        context = "\n\n".join([doc.page_content for doc in docs])

        prompt = f"""
You are an AI customer support assistant.

Answer ONLY using the context below.

If the answer is not present, say:
"I couldn't find that information."

Context:
{context}

Question:
{message}
"""

        response = self.client.chat.completions.create(
            model=settings.OPENAI_CHAT_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": prompt,
                }
            ],
            temperature=0.2,
        )

        return response.choices[0].message.content