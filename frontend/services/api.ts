const API_URL =
  "https://ai-customer-support-backend-9t7j.onrender.com/api";


export async function registerUser(data: {
  full_name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Registration failed");
  }

  return response.json();
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Login failed");
  }

  const result = await response.json();

  // Save token for authenticated requests
  if (result.access_token) {
    localStorage.setItem("token", result.access_token);
  }

  return result;
}

export async function uploadDocument(file: File) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/documents/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Upload failed");
  }

  return response.json();
}

export async function chatWithAI(message: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "AI request failed");
  }

  return response.json();
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to get user information");
  }

  return response.json();
}

export async function getDocuments() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/documents/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to get documents");
  }

  return response.json();
}

export async function deleteDocument(documentId: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/documents/${documentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to delete document");
  }

  return response.json();
}

export function logoutUser() {
  localStorage.removeItem("token");
}