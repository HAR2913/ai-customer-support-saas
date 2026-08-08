"use client";

import { useEffect, useState } from "react";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "@/services/api";

interface DocumentItem {
  id: string;
  filename: string;
  chunks: number;
}

export default function DocumentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function loadDocuments() {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  async function handleUpload() {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    setUploading(true);

    try {
      await uploadDocument(file);

      alert("Document uploaded successfully!");

      setFile(null);

      await loadDocuments();
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(documentId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDocument(documentId);

      alert("Document deleted successfully!");

      await loadDocuments();
    } catch (error) {
      console.error(error);
      alert("Failed to delete document.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <h1 className="text-4xl font-bold text-black">
          📄 Documents
        </h1>

        <p className="mt-2 text-gray-600">
          Upload and manage your company documents.
        </p>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow p-8 mt-8">

          <h2 className="text-xl font-bold text-black">
            Upload PDF
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
            className="mt-5 text-black"
          />

          {file && (
            <p className="mt-4 text-gray-700">
              Selected: {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg mt-5"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

        </div>

        {/* Documents List */}
        <div className="bg-white rounded-xl shadow p-8 mt-8">

          <h2 className="text-xl font-bold text-black">
            Your Documents
          </h2>

          {loading ? (
            <p className="mt-5 text-gray-500">
              Loading documents...
            </p>
          ) : documents.length === 0 ? (
            <p className="mt-5 text-gray-500">
              No documents uploaded yet.
            </p>
          ) : (
            <div className="mt-5 space-y-4">

              {documents.map((document) => (
                <div
                  key={document.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >

                  <div>
                    <p className="font-semibold text-black">
                      📄 {document.filename}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {document.chunks} chunks indexed
                    </p>
                  </div>

                  <div className="flex items-center gap-4">

                    <span className="text-green-600 font-semibold">
                      ✓ Indexed
                    </span>

                    <button
                      onClick={() =>
                        handleDelete(document.id)
                      }
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </main>
  );
}