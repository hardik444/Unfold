import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#0F1117] text-[#F8FAFC] flex items-center justify-center">

            <div className="text-center px-8">

                <p className="uppercase tracking-[0.35em] text-sm text-[#64748B]">

                    ERROR 404

                </p>

                <h1 className="mt-6 text-5xl md:text-7xl font-extrabold">

                    Page not found

                </h1>

                <p className="mt-6 text-xl text-[#94A3B8]">

                    This page doesn't exist in Unfold.

                </p>

                <Link
                    href="/"
                    className="inline-block mt-10 rounded-3xl bg-[#F59E0B] px-8 py-4 text-[#0F1117] font-semibold hover:bg-[#D97706] transition"
                >

                    Back Home

                </Link>

            </div>

        </main>
    );
}