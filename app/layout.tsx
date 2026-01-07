import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ImageForge Compressor",
  description: "High-quality image compression directly in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="08ea4b0c-e2a8-452c-8939-beb47b7e7f3b"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
