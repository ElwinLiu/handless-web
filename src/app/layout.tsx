import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handless — Speech to Text for macOS",
  description:
    "Fast, private speech-to-text that runs entirely on your Mac. Press a shortcut, speak, get text. No cloud required.",
  metadataBase: new URL("https://handless.app"),
  openGraph: {
    title: "Handless — Speech to Text for macOS",
    description:
      "Fast, private speech-to-text that runs entirely on your Mac. Press a shortcut, speak, get text. No cloud required.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handless — Speech to Text for macOS",
    description:
      "Fast, private speech-to-text that runs entirely on your Mac. Press a shortcut, speak, get text.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="theme-color" content="#080604" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
