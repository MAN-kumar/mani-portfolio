import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/content/site";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { BackgroundFoundation } from "@/components/effects/BackgroundFoundation";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mani Kumar — Full-Stack Developer & AI/ML Enthusiast",
    template: "%s — Mani Kumar",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Mani Kumar — Full-Stack Developer & AI/ML Enthusiast",
    description: siteConfig.description,
    siteName: "Mani Kumar Portfolio",
    images: [
      {
        url: siteConfig.ogImage || "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mani Kumar Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mani Kumar — Full-Stack Developer & AI/ML Enthusiast",
    description: siteConfig.description,
    images: [siteConfig.ogImage || "/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mani Kumar",
  jobTitle: "Computer Science Student & Full-Stack Developer",
  url: siteConfig.url,
  sameAs: ["https://github.com/MAN-kumar"],
  knowsAbout: [
    "Computer Science",
    "Full-Stack Development",
    "Python",
    "Django",
    "Next.js",
    "React",
    "Machine Learning",
    "Explainable AI",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="indigo"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)] font-sans">
        <ThemeProvider defaultTheme="indigo">
          <BackgroundFoundation>
            <Navigation />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </BackgroundFoundation>
        </ThemeProvider>
      </body>
    </html>
  );
}
