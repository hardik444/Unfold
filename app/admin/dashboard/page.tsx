"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/admin/login");
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-[#64748B]">Admin</p>
            <h1 className="mt-4 text-5xl font-extrabold">Dashboard</h1>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/admin/login");
            }}
            className="rounded-2xl bg-[#F59E0B] px-6 py-3 text-[#0F1117] font-semibold hover:bg-[#D97706] transition"
          >
            Logout
          </button>
        </div>

        <p className="mt-4 text-lg text-[#94A3B8]">Manage stories, timelines, sources and daily pulse.</p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/add">
            <div className="rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] p-8 cursor-pointer hover:border-[#F59E0B] hover:shadow-lg transition">
              <h2 className="text-2xl font-bold">Add Story</h2>
              <p className="mt-3 text-[#94A3B8]">Create a new internet event.</p>
            </div>
          </Link>

          <Link href="/admin/stories">
            <div className="rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] p-8 cursor-pointer hover:border-[#F59E0B] hover:shadow-lg transition">
              <h2 className="text-2xl font-bold">Manage Stories</h2>
              <p className="mt-3 text-[#94A3B8]">Edit existing stories.</p>
            </div>
          </Link>

          <div className="rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] p-8">
            <h2 className="text-2xl font-bold">Daily Pulse</h2>
            <p className="mt-3 text-[#94A3B8]">Choose today’s featured stories.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
