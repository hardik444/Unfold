import Navbar from "../../components/navbar";
import { connectDB } from "../../lib/mangodb";
import Story from "../../../models/Story";

export default async function StoryPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!process.env.MONGODB_URI) {
    return (
      <main className="min-h-screen bg-[#F4F1EB] text-[#1F2937]">
        <Navbar />
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="text-5xl md:text-7xl font-extrabold">Database Not Configured</h1>
          <p className="mt-6 text-xl text-gray-600">
            Please set `MONGODB_URI` in `.env.local` to load story details.
          </p>
        </section>
      </main>
    );
  }

  await connectDB();

  const story: any = await Story.findOne({ slug: params.slug }).lean();

  if (!story) {
    return (
      <main className="min-h-screen bg-[#F4F1EB] text-[#1F2937]">
        <Navbar />
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
          <h1 className="text-5xl font-bold">Story not found</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] text-[#1F2937]">
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
          {story.status || "Developing"}
        </p>

        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold">{story.title}</h1>

        <p className="mt-6 text-xl text-gray-600">{story.summary}</p>

        {story.tags?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {story.tags.map((tag: string, index: number) => (
              <div
                key={index}
                className="rounded-full border border-[#E5DED3] bg-[#FCFAF7] px-4 py-2 text-sm"
              >
                #{tag}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="rounded-full bg-[#FCFAF7] border border-[#E5DED3] px-4 py-2">
            {story.category || "Uncategorized"}
          </div>

          <div className="rounded-full bg-[#FCFAF7] border border-[#E5DED3] px-4 py-2">
            {story.isTrendingToday ? "Trending" : "Archived"}
          </div>

          <div className="rounded-full bg-[#FCFAF7] border border-[#E5DED3] px-4 py-2">
            {story.status || "Developing"}
          </div>
        </div>

        <article className="mt-12 rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-8 leading-8 text-lg whitespace-pre-wrap">
          {story.article}
        </article>

        <section className="mt-16">
          <h2 className="text-4xl font-bold">Timeline of Events</h2>

          <div className="mt-8 space-y-6">
            {story.timeline?.length ? (
              story.timeline.map((item: any, index: number) => (
                <div
                  key={index}
                  className="relative rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-8 hover:shadow-md transition"
                >
                  <p className="text-sm text-gray-500">{item.date}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-[#E5DED3] bg-[#FCFAF7] p-6">
                No timeline added yet.
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
