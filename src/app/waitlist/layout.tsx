import type { Metadata } from "next";
import Script from 'next/script';
import "../globals.css";
import { Montserrat } from 'next/font/google';
import { LocalizationProvider } from "@/context/LocalizationContext";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '300', '400', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: "Fasqon Waitlist",
  description: "Join the Fasqon waitlist and get early access to next-generation Web3 app.",

  openGraph: {
    title: "Fasqon Waitlist",
    description: "Early access to Fasqon Web3 ecosystem.",
    url: "https://fasqon.com/waitlist",
    siteName: "Fasqon",
    images: [
      {
        url: "https://fasqon.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fasqon Waitlist",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fasqon Waitlist",
    description: "Get early access to Fasqon Web3 ecosystem.",
    images: ["https://fasqon.com/og-image.jpg"],
  },
}

export default function WaitlistLayout({
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
        <LocalizationProvider>
          {children}
        </LocalizationProvider>
      </body>
    </html>
  );
}
