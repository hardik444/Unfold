import Link from "next/link";
import Navbar from "../../components/navbar";
import { connectDB } from "../../lib/mangodb";
import Story from "../../../models/Story";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  if (!process.env.MONGODB_URI) {
    return (
      <main className="min-h-screen bg-[#F4F1EB] text-[#1F2937]">
        <Navbar />
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="text-5xl md:text-7xl font-extrabold">Database Not Configured</h1>
          <p className="mt-6 text-xl text-gray-600">
            Please set `MONGODB_URI` in `.env.local` to load category stories.
          </p>
        </section>
      </main>
    );
  }

  await connectDB();

  const category = decodeURIComponent(params.category);
  const stories = await Story.find({ category }).lean();

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#1F2937]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <h1 className="text-5xl font-extrabold">{category}</h1>

        <div className="mt-12 space-y-6">
          {stories.length === 0 ? (
            <div className="rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-8">
              No stories in this category yet.
            </div>
          ) : (
            stories.map((story: any) => (
              <Link key={story._id.toString()} href={`/controversy/${story.slug}`}>
                <div className="rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-8 hover:shadow-md transition cursor-pointer">
                  <h2 className="text-3xl font-bold">{story.title}</h2>
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
