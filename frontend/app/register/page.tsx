"use client";

import { useState } from "react";
import { registerUser } from "@/services/api";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      const result = await registerUser({
        full_name: fullName,
        email,
        password,
      });

      alert("Registration Successful!");
      console.log(result);
    } catch (error) {
      alert("Registration Failed!");
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[450px] bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-black text-center">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg p-3 mt-8"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 mt-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3 mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white rounded-lg p-3 mt-6"
        >
          Register
        </button>
      </div>
    </main>
  );
}