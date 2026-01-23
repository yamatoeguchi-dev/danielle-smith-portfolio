import type { Metadata } from "next";
import { Playfair_Display, Inter, IBM_Plex_Sans } from 'next/font/google';
import "./globals.css";

import { Header } from "@/components/header/header";
import PortfolioFooter from "@/components/PortfolioFooter";
import ContentContainer from "@/components/content-container";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const headlineSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--headline-serif",
  display: "swap",
});

const bodySans = Inter({
  subsets: ["latin"],
  variable: "--body-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Danielle Smith",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"></meta>
          <link rel="stylesheet" href="https://use.typekit.net/nvv1ner.css"></link>
        </head>
        <body className={`${ibmPlexSans.className} ${headlineSerif.variable} ${bodySans.variable}`}>
          <Header />
          <ContentContainer>
            {children}
          </ContentContainer>
          <PortfolioFooter name="Danielle Smith" year={2026}/>
        </body>
      </html>
  );
}
