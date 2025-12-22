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

/**
 * ✅ GLOBAL SEO METADATA
 * Applied to entire app
 */
export const metadata: Metadata = {
  title: "ApniSec | Cybersecurity & VAPT Platform",
  description:
    "ApniSec provides Cloud Security, Red Team Assessment, and VAPT solutions for modern organizations.",
  keywords: [
    "ApniSec",
    "Cybersecurity",
    "Cloud Security",
    "VAPT",
    "Red Team Assessment",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
