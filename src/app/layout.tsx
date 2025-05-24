import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TUSKİLOG - TUS Uzmanlık Tercih Sistemi",
  description: "Türkiye'de tıpta uzmanlık sınavına giren doktorların uzmanlık seçimi sürecindeki kafa karışıklığını gidermek için geliştirilen AI destekli web uygulaması.",
  keywords: "TUS, uzmanlık, doktor, tıp, tercih, AI, yapay zeka",
  authors: [{ name: "TUSKİLOG Team" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SessionWrapper>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {children}
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}