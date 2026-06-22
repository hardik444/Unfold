"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("adminToken", data.token);
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] flex justify-center items-center px-4">
      <form onSubmit={handleLogin} className="w-full max-w-[450px] rounded-3xl bg-[#FCFAF7] p-8 md:p-10 shadow-sm">
        <p className="uppercase tracking-[0.3em] text-sm text-gray-500">Unfold Admin</p>
        <h1 className="mt-4 text-4xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="mt-8 w-full rounded-2xl border border-[#E5DED3] p-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded-2xl border border-[#E5DED3] p-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-8 w-full rounded-2xl bg-[#B16A3B] py-4 text-white font-semibold">
          Login
        </button>
      </form>
    </main>
  );
}
