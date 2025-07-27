import type { Metadata } from "next";
import Script from 'next/script';
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/FooterSection/FooterSection";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import { LocalizationProvider } from '../context/LocalizationContext';
import { Suspense } from "react";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '300', '400', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: {
    default: "Fasqon - Next Generation Web3 Solutions",
    template: "%s | Fasqon",
  },
  description: "Fasqon offers next-gen Web3 solutions for retail and business. Discover advanced crypto payment, private bank cards, and more.",

  icons: {
    icon: [
      { url: '/icons/fsqn/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/fsqn/favicon.png', sizes: '32x32', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/icons/fsqn/favicon.svg', color: '#30f427' }
    ]
  },

  openGraph: {
    title: "Fasqon - Next Generation Web3 Solutions",
    description: "Fasqon is a next gen web3 neobank for daily payments. Get your crypto card right now!",
    url: "https://fasqon.com",
    siteName: "Fasqon",
    images: [
      {
        url: "https://fasqon.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fasqon OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Fasqon — Next Generation Web3 Solutions',
    description: 'Fasqon offers next-gen Web3 solutions for retail and business. Discover advanced crypto payment, private bank cards, and more.',
    images: ['https://fasqon.com/images/preview.jpg'],
  },

  other: {
    'telegram:title': "Fasqon - Next Generation Web3 Solutions",
    'telegram:description': "Fasqon is a next gen web3 neobank for daily payments.Get your crypto card right now!",
    'telegram:image': "https://fasqon.com/og-image.jpg",
    'image_src': "https://fasqon.com/og-image.jpg"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YTHG925892"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YTHG925892');
          `}
        </Script>
      </head>
      <body >
        <meta name="image_src" content="https://fasqon.com/og-image.jpg" />
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
