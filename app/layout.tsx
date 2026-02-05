import type { Metadata, Viewport } from "next"; // <-- Thêm Viewport vào đây
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exam Web",
  description: "Hệ thống thi trắc nghiệm và tự luận",
};

// 👇 THÊM ĐOẠN NÀY: Bắt buộc để điện thoại không bị zoom nhỏ
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Tùy chọn: Chặn người dùng zoom tay (giống app native)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Thêm 'w-full overflow-x-hidden' để cắt bỏ phần thừa nếu có */}
        <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-900">
          <Header />
          {/* Main: Trên mobile padding 4 (16px), trên PC padding 8 (32px) cho thoáng */}
          <main className="mx-auto w-full max-w-5xl px-4 py-4 md:py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}