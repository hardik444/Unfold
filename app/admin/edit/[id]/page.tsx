"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditStoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [article, setArticle] = useState("");
  const [category, setCategory] = useState("");
  const [isTrendingToday, setIsTrendingToday] = useState(false);

  useEffect(() => {
    async function fetchStory() {
      const res = await fetch(`/api/stories/${id}`);
      const data = await res.json();

      if (data.success && data.story) {
        setTitle(data.story.title || "");
        setSlug(data.story.slug || "");
        setSummary(data.story.summary || "");
        setArticle(data.story.article || "");
        setCategory(data.story.category || "");
        setIsTrendingToday(data.story.isTrendingToday || false);
      }
    }

    fetchStory();
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/stories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, summary, article, category, isTrendingToday }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Story updated!");
      router.push("/admin/stories");
    } else {
      alert("Update failed");
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#1F2937]">
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <h1 className="text-5xl font-extrabold">Edit Story</h1>

        <form onSubmit={handleUpdate} className="mt-10 space-y-5">
          <input className="w-full rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-4" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="w-full rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-4" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <textarea rows={3} className="w-full rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-4" value={summary} onChange={(e) => setSummary(e.target.value)} />
          <textarea rows={8} className="w-full rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-4" value={article} onChange={(e) => setArticle(e.target.value)} />
          <input className="w-full rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-4" value={category} onChange={(e) => setCategory(e.target.value)} />

          <label className="flex items-center gap-3">
            <input type="checkbox" checked={isTrendingToday} onChange={(e) => setIsTrendingToday(e.target.checked)} />
            Trending Today
          </label>

          <button className="rounded-3xl bg-[#B16A3B] px-8 py-4 text-white font-semibold">
            Update Story
          </button>
        </form>
      </section>
    </main>
  );
}
