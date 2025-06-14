import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
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
  title: "Recipe Finder",
  description: "Discover, favorite, and explore AI-powered recipes with this app.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: " Recipe Finder",
    description: "Discover, favorite, and explore AI-powered recipes with this app.",
    url: "https://your-app-url.com", //todo
    siteName: "App Recipe Finder",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recipe Finder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipe Finder",
    description: "Discover, favorite, and explore AI-powered recipes with this app.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
