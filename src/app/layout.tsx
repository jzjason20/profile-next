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
    images: [
      {
        url: "/logo-card.png",
        width: 1200,
        height: 630,
        alt: "Jacy — Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacy — Creative Developer",
    description:
      "Developer building experiments across web, ML, and creative technology.",
    images: ["/logo-card.png"],
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
