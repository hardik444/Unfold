import Link from "next/link";
import Navbar from "../../components/navbar";
import { connectDB } from "../../lib/mangodb";
import Story from "../../../models/Story";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryParam } = await params;
  if (!process.env.MONGODB_URI) {
    return (
      <main className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
        <Navbar />
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="text-5xl md:text-7xl font-extrabold">Database Not Configured</h1>
          <p className="mt-6 text-xl text-[#94A3B8]">
            Please set `MONGODB_URI` in `.env.local` to load category stories.
          </p>
        </section>
      </main>
    );
  }

  await connectDB();

  const category = decodeURIComponent(categoryParam);
  const stories = await Story.find({ category }).lean();

  return (
    <main className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <h1 className="text-5xl font-extrabold">{category}</h1>

        <div className="mt-12 space-y-6">
          {stories.length === 0 ? (
            <div className="rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] p-8 text-[#94A3B8]">
              No stories in this category yet.
            </div>
          ) : (
            stories.map((story: any) => (
              <Link key={story._id.toString()} href={`/controversy/${story.slug}`}>
                <div className="rounded-3xl border border-[#2A2F3A] bg-[#1A1D24] p-8 hover:border-[#F59E0B] hover:shadow-lg transition cursor-pointer">
                  <h2 className="text-3xl font-bold">{story.title}</h2>
                  <p className="mt-4 text-[#94A3B8]">{story.summary}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
