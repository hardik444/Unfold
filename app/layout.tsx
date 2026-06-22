import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unfold",
  description: "Follow the full story.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
