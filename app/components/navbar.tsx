import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-[#E5DED3] bg-[#F4F1EB] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-extrabold text-[#1F2937]">
          Unfold
        </Link>

        <div className="flex flex-wrap justify-center gap-5 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-[#1F2937]">Home</Link>
          <Link href="/search" className="hover:text-[#1F2937]">Search</Link>
          <Link href="/admin/dashboard" className="hover:text-[#1F2937]">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
