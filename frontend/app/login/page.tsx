"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const result = await loginUser({
        email,
        password,
      });

      // Save JWT Token
      localStorage.setItem("token", result.access_token);

      alert("Login Successful!");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[400px] bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-black text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mt-8 bg-white text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mt-4 bg-white text-black"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 mt-6"
        >
          Login
        </button>

      </div>
    </main>
  );
}