from pathlib import Path

from bson import ObjectId
from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException,
)

from app.services.document_service import DocumentService
from app.services.vector_service import VectorService
from app.api.deps import get_current_user
from app.database.mongodb import documents_collection


router = APIRouter(
    prefix="/api/documents",
    tags=["Documents"],
)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    result = DocumentService.save_document(file)

    text = DocumentService.extract_text(
        result["path"]
    )

    document = {
        "filename": result["filename"],
        "path": result["path"],
        "user_id": str(current_user["_id"]),
        "chunks": 0,
    }

    inserted = documents_collection.insert_one(document)

    document_id = str(inserted.inserted_id)

    chunks = VectorService.save_document(
        text,
        document_id,
    )

    documents_collection.update_one(
        {
            "_id": inserted.inserted_id
        },
        {
            "$set": {
                "chunks": chunks
            }
        }
    )

    return {
        "message": "Document indexed successfully",
        "filename": result["filename"],
        "chunks": chunks,
    }


@router.get("/")
def get_documents(
    current_user=Depends(get_current_user),
):
    documents = documents_collection.find(
        {
            "user_id": str(current_user["_id"])
        }
    )

    result = []

    for document in documents:
        result.append({
            "id": str(document["_id"]),
            "filename": document["filename"],
            "chunks": document["chunks"],
        })

    return result


@router.delete("/{document_id}")
def delete_document(
    document_id: str,
    current_user=Depends(get_current_user),
):
    try:
        object_id = ObjectId(document_id)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid document ID",
        )

    document = documents_collection.find_one(
        {
            "_id": object_id,
            "user_id": str(current_user["_id"]),
        }
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    # Delete vectors from ChromaDB
    VectorService.delete_document(
        document_id
    )

    # Delete physical PDF
    file_path = Path(document["path"])

    if file_path.exists():
        file_path.unlink()

    # Delete MongoDB metadata
    documents_collection.delete_one(
        {
            "_id": object_id,
            "user_id": str(current_user["_id"]),
        }
    )

    return {
        "message": "Document deleted successfully"
    }