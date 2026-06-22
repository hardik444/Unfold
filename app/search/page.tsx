"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

type Story = {
  _id: string;
  title: string;
  summary: string;
  slug: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [stories, setStories] = useState<Story[]>([]);

  async function searchStories(searchText: string) {
    if (!searchText.trim()) return;

    const res = await fetch(`/api/search?q=${encodeURIComponent(searchText)}`);
    const data = await res.json();

    if (data.success) {
      setStories(data.stories);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");

    if (q) {
      setQuery(q);
      searchStories(q);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#1F2937]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <p className="uppercase tracking-[0.35em] text-sm text-gray-500">
          Search Engine
        </p>

        <h1 className="mt-4 text-5xl md:text-7xl font-extrabold">Search Unfold</h1>

        <p className="mt-4 text-xl text-gray-600">
          Search internet events, creators and stories.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search internet events..."
            className="flex-1 w-full rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] px-6 py-5 text-lg outline-none"
          />

          <button
            onClick={() => searchStories(query)}
            className="w-full sm:w-auto rounded-3xl bg-[#B16A3B] px-8 py-5 text-white font-semibold hover:bg-[#9C5B30] transition"
          >
            Search
          </button>
        </div>

        <div className="mt-12 space-y-6">
          {stories.length === 0 ? (
            <div className="text-gray-500">No results yet.</div>
          ) : (
            stories.map((story) => (
              <Link key={story._id} href={`/controversy/${story.slug}`}>
                <div className="rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-8 hover:shadow-md cursor-pointer">
                  <h2 className="text-2xl font-bold">{story.title}</h2>
                  <p className="mt-4 text-gray-600">{story.summary}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
