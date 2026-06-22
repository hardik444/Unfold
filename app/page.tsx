import Navbar from "./components/navbar";
import Link from "next/link";
import { connectDB } from "./lib/mangodb";
import Story from "../models/Story";

export default async function Home() {
  if (!process.env.MONGODB_URI) {
    return (
      <main className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
        <Navbar />
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="text-5xl md:text-7xl font-extrabold">
            Database Not Configured
          </h1>

          <p className="mt-6 text-xl text-[#94A3B8]">
            Please set `MONGODB_URI` in `.env.local` to load stories.
          </p>
        </section>
      </main>
    );
  }

  await connectDB();

  const stories = await Story.find({ isTrendingToday: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  const featuredStory: any = stories[0];

  const categories = [
    "All",
    "YouTube",
    "Instagram",
    "Creators",
    "Brands",
    "Tech",
    "India",
    "Global",
  ];

  return (
    <main className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <p className="uppercase tracking-[0.35em] text-sm text-[#64748B]">
          Internet Events Archive
        </p>

        <h1 className="mt-6 text-5xl md:text-8xl font-extrabold">
          Unfold
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-[#94A3B8]">
          Follow the full story behind internet events, creators, brands and trending topics.
        </p>

        <form action="/search" className="mt-12 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="q"
            placeholder="What are you trying to understand?"
            className="flex-1 w-full rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] px-6 py-5 text-lg text-[#F8FAFC] placeholder:text-[#64748B] outline-none focus:border-[#F59E0B]"
          />

          <button className="w-full sm:w-auto rounded-3xl bg-[#F59E0B] px-8 py-5 text-[#0F1117] font-bold hover:bg-[#D97706] transition">
            Search
          </button>
        </form>

        {featuredStory && (
          <section className="mt-20">
            <Link href={`/controversy/${featuredStory.slug}`}>
              <div className="rounded-[40px] border border-[#2A2F3A] bg-[#1A1D24] p-6 md:p-12 hover:border-[#F59E0B] hover:shadow-lg transition cursor-pointer">
                <p className="text-sm font-semibold tracking-[0.3em] text-[#F59E0B]">
                  FEATURED STORY
                </p>

                <h2 className="mt-6 text-3xl md:text-5xl font-extrabold text-[#F8FAFC]">
                  {featuredStory.title}
                </h2>

                <p className="mt-6 max-w-3xl text-lg md:text-xl text-[#94A3B8]">
                  {featuredStory.summary}
                </p>

                <div className="mt-8 text-[#F59E0B] font-semibold">
                  Read full story →
                </div>
              </div>
            </Link>
          </section>
        )}

        <section className="mt-16">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={category === "All" ? "/" : `/category/${category}`}
                className="rounded-full border border-[#2A2F3A] bg-[#1A1D24] px-5 py-3 text-[#CBD5E1] hover:border-[#F59E0B] hover:text-[#F59E0B] transition"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-3xl font-bold text-[#F8FAFC]">
            Trending Today
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.length === 0 ? (
              <div className="rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] p-8 text-[#94A3B8]">
                No trending stories yet.
              </div>
            ) : (
              stories.map((story: any) => (
                <Link key={story._id.toString()} href={`/controversy/${story.slug}`}>
                  <div className="min-h-[320px] rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] p-8 cursor-pointer hover:border-[#F59E0B] hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#0F1117] border border-[#2A2F3A] px-3 py-1 text-xs font-semibold text-[#CBD5E1]">
                        {story.category || "General"}
                      </span>

                      <span className="text-xs text-[#64748B]">
                        {story.status || "Developing"}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-bold text-[#F8FAFC]">
                      {story.title}
                    </h3>

                    <p className="mt-4 text-[#94A3B8] line-clamp-3">
                      {story.summary}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <div className="text-sm text-[#F59E0B] font-semibold">
                        View timeline →
                      </div>

                      {story.isTrendingToday && (
                        <div className="text-sm font-semibold text-[#CBD5E1]">
                          Trending
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}