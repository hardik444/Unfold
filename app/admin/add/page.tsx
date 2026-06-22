"use client";

import { useState } from "react";

export default function AddStoryPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [article, setArticle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isTrendingToday, setIsTrendingToday] = useState(false);
  const [timeline, setTimeline] = useState([{ date: "", title: "", description: "" }]);

  function addTimeline() {
    setTimeline([...timeline, { date: "", title: "", description: "" }]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        summary,
        article,
        category,
        timeline,
        status: "Developing",
        peopleInvolved: [],
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        isTrendingToday,
        sources: [],
        videos: [],
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Story Published!");
      setTitle("");
      setSlug("");
      setSummary("");
      setArticle("");
      setCategory("");
      setTags("");
      setIsTrendingToday(false);
      setTimeline([{ date: "", title: "", description: "" }]);
    } else {
      alert("Failed to publish story.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <p className="uppercase tracking-[0.35em] text-sm text-[#64748B]">Unfold CMS</p>
        <h1 className="mt-4 text-5xl font-extrabold">Add Story</h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <input className="w-full rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none" placeholder="Story Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="w-full rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <textarea rows={3} className="w-full rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
          <textarea rows={8} className="w-full rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none" placeholder="Full Article" value={article} onChange={(e) => setArticle(e.target.value)} />
          <input className="w-full rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input className="w-full rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />

          <label className="flex items-center gap-3">
            <input type="checkbox" checked={isTrendingToday} onChange={(e) => setIsTrendingToday(e.target.checked)} />
            Trending Today
          </label>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Timeline</h2>

            {timeline.map((item, index) => (
              <div key={index} className="rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] p-6 space-y-4">
                <input
                  placeholder="Date"
                  className="w-full rounded-2xl border border-[#2A2F3A] bg-[#0F1117] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none"
                  value={item.date}
                  onChange={(e) => {
                    const updated = [...timeline];
                    updated[index].date = e.target.value;
                    setTimeline(updated);
                  }}
                />

                <input
                  placeholder="Event title"
                  className="w-full rounded-2xl border border-[#2A2F3A] bg-[#0F1117] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...timeline];
                    updated[index].title = e.target.value;
                    setTimeline(updated);
                  }}
                />

                <textarea
                  placeholder="Description"
                  rows={3}
                  className="w-full rounded-2xl border border-[#2A2F3A] bg-[#0F1117] text-[#F8FAFC] placeholder:text-[#64748B] p-4 focus:border-[#F59E0B] outline-none"
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...timeline];
                    updated[index].description = e.target.value;
                    setTimeline(updated);
                  }}
                />
              </div>
            ))}

            <button type="button" onClick={addTimeline} className="rounded-2xl bg-[#1A1D24] border border-[#2A2F3A] text-[#F8FAFC] px-6 py-3 hover:border-[#F59E0B] transition">
              + Add Timeline Event
            </button>
          </div>

          <button className="rounded-3xl bg-[#F59E0B] px-8 py-4 text-[#0F1117] font-semibold hover:bg-[#D97706] transition">
            Publish Story
          </button>
        </form>
      </section>
    </main>
  );
}
