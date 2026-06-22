"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Story = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
};

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);

  async function fetchStories() {
    const res = await fetch("/api/stories");
    const data = await res.json();
    if (data.success) setStories(data.stories);
  }

  useEffect(() => {
    fetchStories();
  }, []);

  async function deleteStory(id: string) {
    const confirmed = confirm("Delete this story?");
    if (!confirmed) return;

    const res = await fetch(`/api/stories/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) fetchStories();
  }

  return (
    <main className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <h1 className="text-5xl font-extrabold">Manage Stories</h1>

        <div className="mt-10 space-y-6">
          {stories.length === 0 ? (
            <div className="rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] p-8 text-[#94A3B8]">
              No stories yet.
            </div>
          ) : (
            stories.map((story) => (
              <div key={story._id} className="rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] p-8">
                <h2 className="text-2xl font-bold">{story.title}</h2>
                <p className="mt-3 text-[#94A3B8]">{story.summary}</p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href={`/admin/edit/${story._id}`}>
                    <button className="rounded-2xl bg-[#F59E0B] px-6 py-3 text-[#0F1117] hover:bg-[#D97706] transition">
                      Edit
                    </button>
                  </Link>

                  <button onClick={() => deleteStory(story._id)} className="rounded-2xl bg-[#1A1D24] border border-[#2A2F3A] px-6 py-3 text-[#F8FAFC] hover:border-[#F59E0B] hover:text-[#F59E0B] transition">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
