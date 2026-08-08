"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        AI Customer Support SaaS
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </header>
  );
}