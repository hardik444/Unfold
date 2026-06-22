import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#2A2F3A] bg-[#0F1117]/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-extrabold text-[#F8FAFC]">
          <div className="flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-[#F59E0B]" />

            <span className="text-2xl font-extrabold">

              Unfold

            </span>

          </div>
        </Link>

        <div className="flex flex-wrap justify-center gap-5 text-sm font-medium text-[#94A3B8]">
          <Link href="/" className="hover:text-[#F59E0B]">
            Home
          </Link>

          <Link href="/search" className="hover:text-[#F59E0B]">
            Search
          </Link>

          <Link href="/admin/dashboard" className="hover:text-[#F59E0B]">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}