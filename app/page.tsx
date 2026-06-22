import Navbar from "./components/navbar";
import Link from "next/link";
import { connectDB } from "./lib/mangodb";
import Story from "../models/Story";

export default async function Home() {
  if (!process.env.MONGODB_URI) {
    return (
      <main className="min-h-screen bg-[#F4F1EB] text-[#1F2937]">
        <Navbar />
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="text-5xl md:text-7xl font-extrabold">Database Not Configured</h1>
          <p className="mt-6 text-xl text-gray-600">
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
    <main className="min-h-screen bg-[#F4F1EB] text-[#1F2937]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <p className="uppercase tracking-[0.35em] text-sm text-gray-500">
          Internet Events Archive
        </p>

        <h1 className="mt-6 text-5xl md:text-8xl font-extrabold">Unfold</h1>

        <p className="mt-6 max-w-2xl text-xl text-gray-600">
          Follow the full story behind internet events, creators, brands and trending topics.
        </p>

        <form action="/search" className="mt-12 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="q"
            placeholder="What are you trying to understand?"
            className="flex-1 w-full rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] px-6 py-5 text-lg outline-none"
          />

          <button className="w-full sm:w-auto rounded-3xl bg-[#B16A3B] px-8 py-5 text-white font-semibold hover:bg-[#9C5B30] transition">
            Search
          </button>
        </form>

        {featuredStory && (
          <section className="mt-20">
            <Link href={`/controversy/${featuredStory.slug}`}>
              <div className="rounded-[40px] border border-[#E5DED3] bg-[#FCFAF7] p-6 md:p-12 hover:shadow-md transition cursor-pointer">
                <p className="text-sm font-semibold tracking-[0.3em] text-[#B16A3B]">
                  FEATURED STORY
                </p>

                <h2 className="mt-6 text-3xl md:text-5xl font-extrabold">
                  {featuredStory.title}
                </h2>

                <p className="mt-6 max-w-3xl text-xl text-gray-600">
                  {featuredStory.summary}
                </p>
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
                className="rounded-full border border-[#E5DED3] bg-[#FCFAF7] px-5 py-3 hover:bg-[#EDE7DD] transition"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-3xl font-bold">Trending Today</h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.length === 0 ? (
              <div className="rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-8">
                No trending stories yet.
              </div>
            ) : (
              stories.map((story: any) => (
                <Link key={story._id.toString()} href={`/controversy/${story.slug}`}>
                  <div className="min-h-[320px] rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-8 cursor-pointer hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#F4F1EB] px-3 py-1 text-xs font-semibold">
                        {story.category || "General"}
                      </span>

                      <span className="text-xs text-gray-500">
                        {story.status || "Developing"}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-bold">{story.title}</h3>

                    <p className="mt-4 text-gray-600 line-clamp-3">
                      {story.summary}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <div className="text-sm text-[#B16A3B] font-semibold">
                        View timeline →
                      </div>

                      {story.isTrendingToday && (
                        <div className="text-sm font-semibold">Trending</div>
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
