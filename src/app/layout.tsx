
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/FooterSection/FooterSection";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import { LocalizationProvider } from '../context/LocalizationContext';
import { Suspense } from "react";


export const metadata: Metadata = {
  title: {
    default: "Fasqon - Next Generation Web3 Solutions",
    template: "%s | Fasqon",
  },
  description: "Fasqon offers next-gen Web3 solutions for retail and business. Discover advanced crypto payment, private bank cards, and more.",

  openGraph: {
    title: "Fasqon - Next Generation Web3 Solutions",
    description: "Fasqon is a next gen web3 neobank for daily payments.Get your crypto card right now!",
    url: "https://fasqon.com",
    siteName: "Fasqon",
    images: [
      {
        url: "https://fasqon.com/og-image.jpg", // Use a JPG/PNG instead of SVG for better compatibility
        width: 1200,
        height: 630,
        alt: "Fasqon OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  other: {
    'telegram:title': "Fasqon - Next Generation Web3 Solutions",
    'telegram:description': "Fasqon is a next gen web3 neobank for daily payments.Get your crypto card right now!",
    'telegram:image': "https://fasqon.com/og-image.jpg"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <LocalizationProvider>
          <Suspense fallback={null}>
            <Header />
            <CookieBanner />
            {children}
            <Footer />
          </Suspense>
        </LocalizationProvider>
      </body>
    </html>
  );
}
