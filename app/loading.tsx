export default function Loading() {
    return (
        <main className="min-h-screen bg-[#0F1117] flex items-center justify-center">

            <div className="flex flex-col items-center gap-4">

                <div className="h-12 w-12 rounded-full border-4 border-[#2A2F3A] border-t-[#F59E0B] animate-spin" />

                <p className="text-[#94A3B8]">

                    Loading Unfold...

                </p>

            </div>

        </main>
    );
}