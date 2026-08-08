from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.core.config import settings


class VectorService:

    embeddings = OpenAIEmbeddings(
        api_key=settings.OPENAI_API_KEY,
        model="text-embedding-3-small",
    )

    vector_db = Chroma(
        persist_directory=settings.CHROMA_DB_PATH,
        embedding_function=embeddings,
    )

    @staticmethod
    def save_document(text: str, document_id: str):

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50,
        )

        chunks = splitter.split_text(text)

        VectorService.vector_db.add_texts(
            texts=chunks,
            metadatas=[
                {
                    "document_id": document_id
                }
                for _ in chunks
            ],
        )

        return len(chunks)

    @staticmethod
    def delete_document(document_id: str):

        collection = VectorService.vector_db._collection

        results = collection.get(
            where={
                "document_id": document_id
            }
        )

        ids = results.get("ids", [])

        if ids:
            collection.delete(ids=ids)