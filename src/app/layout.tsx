import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const SessionWrapper = dynamic(() => import("@/components/SessionWrapper"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "TUSKİLOG - TUS Uzmanlık Tercih Sistemi",
  description: "Türkiye'de tıpta uzmanlık sınavına giren doktorların uzmanlık seçimi sürecindeki kafa karışıklığını gidermek için geliştirilen AI destekli web uygulaması.",
  keywords: "TUS, uzmanlık, doktor, tıp, tercih, AI, yapay zeka",
  authors: [{ name: "TUSKİLOG Team" }]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${inter.className}`}>
        <SessionWrapper>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {children}
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}