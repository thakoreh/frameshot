import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrameShot — Beautiful Device Mockups in Seconds",
  description:
    "Create stunning device mockups for your app screenshots. iPhone, MacBook, Android frames with custom backgrounds. Free to start, no signup required.",
  keywords:
    "device mockup, app screenshot, iPhone mockup, MacBook mockup, ProductHunt launch, App Store screenshot, marketing assets",
  openGraph: {
    title: "FrameShot — Beautiful Device Mockups in Seconds",
    description:
      "Create stunning device mockups for your app screenshots. iPhone, MacBook, Android frames with custom backgrounds.",
    type: "website",
    url: "https://frameshot.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "FrameShot — Beautiful Device Mockups in Seconds",
    description:
      "Create stunning device mockups for your app screenshots. Free to start.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
