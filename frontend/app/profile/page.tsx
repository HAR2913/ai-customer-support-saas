"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/api";

interface User {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">
          Loading profile...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold text-black">
          👤 Profile
        </h1>

        {user && (
          <div className="bg-white rounded-xl shadow mt-8 p-8">

            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="text-xl font-semibold text-black">
                {user.full_name}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="text-xl font-semibold text-black">
                {user.email}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Account Status
              </p>

              <p className="text-xl font-semibold text-green-600">
                {user.is_active ? "Active" : "Inactive"}
              </p>
            </div>

            <div className="border-t pt-6">

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
              >
                Logout
              </button>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}