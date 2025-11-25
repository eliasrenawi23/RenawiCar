import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Renawi Cars - Premium Car Dealership",
    template: "%s | Renawi Cars",
  },
  description: "Find your perfect car at Renawi Cars. Browse our extensive collection of quality vehicles including SUVs, Sedans, and Sports Cars.",
  keywords: ["car dealership", "used cars", "new cars", "buy car", "sell car", "renawi cars", "luxury cars"],
  authors: [{ name: "Renawi Cars" }],
  creator: "Renawi Cars",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://renawicars.com",
    title: "Renawi Cars - Premium Car Dealership",
    description: "Find your perfect car at Renawi Cars. Browse our extensive collection of quality vehicles.",
    siteName: "Renawi Cars",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renawi Cars - Premium Car Dealership",
    description: "Find your perfect car at Renawi Cars. Browse our extensive collection of quality vehicles.",
    creator: "@renawicars",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${inter.variable} antialiased font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
