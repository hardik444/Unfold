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
    <main className="min-h-screen bg-[#0F1117] flex justify-center items-center px-4">
      <form onSubmit={handleLogin} className="w-full max-w-[450px] rounded-3xl bg-[#1A1D24] p-8 md:p-10 shadow-sm border border-[#2A2F3A]">
        <p className="uppercase tracking-[0.3em] text-sm text-[#64748B]">Unfold Admin</p>
        <h1 className="mt-4 text-4xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="mt-8 w-full rounded-2xl border border-[#2A2F3A] bg-[#0F1117] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded-2xl border border-[#2A2F3A] bg-[#0F1117] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-8 w-full rounded-2xl bg-[#F59E0B] py-4 text-[#0F1117] font-semibold hover:bg-[#D97706] transition">
          Login
        </button>
      </form>
    </main>
  );
}
