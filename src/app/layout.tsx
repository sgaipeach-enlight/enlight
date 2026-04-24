import type { Metadata } from "next";
import { Geist, Geist_Mono, Sarabun } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Enlight — Mindfulness Training & Staff Development",
  description:
    "แพลตฟอร์มจัดการการอบรมด้านจิตวิทยาและการเจริญสติ ครบวงจร สำหรับผู้สนใจพัฒนาตนเองและยกระดับสู่การเป็นสต๊าฟ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} ${sarabun.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-[var(--font-sarabun)]">
        <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur-md">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                ✦
              </span>
              <span>Enlight</span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/courses"
                className="text-stone-600 hover:text-stone-900"
              >
                หลักสูตร
              </Link>
              <Link
                href="/admin"
                className="text-stone-600 hover:text-stone-900"
              >
                Admin
              </Link>
              <Link
                href="/courses"
                className="rounded-full bg-stone-900 px-4 py-1.5 text-white hover:bg-stone-700"
              >
                สมัครอบรม
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 bg-white py-8 text-center text-sm text-stone-500">
          <p>© 2026 Enlight — Mindfulness Training & Staff Development</p>
          <p className="mt-1 text-xs">
            POC Mockup — สำหรับทดลองเท่านั้น
          </p>
        </footer>
      </body>
    </html>
  );
}
