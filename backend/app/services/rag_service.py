from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

from app.core.config import settings


class RAGService:

    def __init__(self):
        self.embeddings = OpenAIEmbeddings(
            api_key=settings.OPENAI_API_KEY,
            model=settings.OPENAI_EMBEDDING_MODEL,
        )

        self.db = Chroma(
            persist_directory=settings.CHROMA_DB_PATH,
            embedding_function=self.embeddings,
        )

    def search(self, query: str, k: int = 4):
        docs = self.db.similarity_search(query, k=k)
        return docs