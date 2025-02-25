import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/FooterSection/FooterSection";


export const metadata: Metadata = {
  title: {
    default: "Fasqon - Next Generation Web3 Solutions",
    template: "%s | Fasqon", 
  },
  description: "Fasqon offers next-gen Web3 solutions for retail and business. Discover advanced crypto payment, private bank cards, and more.",

  // Можно добавить ключевые слова
  keywords: ["Web3", "crypto", "Fasqon", "payment solutions", "bank card", "blockchain"],

  // Open Graph (og) данные
  openGraph: {
    title: "Fasqon - Next Generation Web3 Solutions",
    description: "Fasqon provides secure and private crypto services for retail and business.",
    url: "https://fasqon.com", // твой домен
    siteName: "Fasqon",
    images: [
      {
        url: "https://fasqon.com/og-image.jpg", // путь к твоему изображению
        width: 1200,
        height: 630,
        alt: "Fasqon OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

 
  twitter: {
    card: "summary_large_image",
    title: "Fasqon - Next Generation Web3 Solutions",
    description: "Advanced crypto payments, private bank cards, and blockchain messaging.",
    images: ["https://fasqon.com/og-image.jpg"],
    creator: "@Fasqon", 
  },


  alternates: {
    canonical: "https://fasqon.com", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
