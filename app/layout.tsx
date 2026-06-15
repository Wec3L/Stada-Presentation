import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Digital Innovation for STADA Kazakhstan | Oleksandr Melai",
  description:
    "An executive presentation website showing how digital solutions, AI workflows and scalable innovation systems can accelerate STADA Kazakhstan.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Digital Innovation for the Future of STADA Kazakhstan",
    description:
      "A premium interactive presentation for Digital Innovation & AI Solutions leadership.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
