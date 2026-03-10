import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jzxx.dev"),
  title: "Jacy — Creative Developer",
  description:
    "Portfolio of Jason (Jacy) — developer building experiments across web, ML, and creative technology. Shipping since 2019.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Jacy — Creative Developer",
    description:
      "Developer building experiments across web, ML, and creative technology. IEEE-published researcher. Shipping since 2019.",
    type: "website",
    url: "https://jzxx.dev",
    siteName: "Jacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacy — Creative Developer",
    description:
      "Developer building experiments across web, ML, and creative technology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
