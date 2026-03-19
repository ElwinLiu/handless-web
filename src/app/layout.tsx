import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handless — Speech to Text for macOS",
  description:
    "Fast speech-to-text for macOS. Go fully local or bring your own API keys. Press a shortcut, speak, get text in any app.",
  metadataBase: new URL("https://handless.elwin.cc"),
  openGraph: {
    title: "Handless — Speech to Text for macOS",
    description:
      "Fast speech-to-text for macOS. Go fully local or bring your own API keys. Press a shortcut, speak, get text in any app.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handless — Speech to Text for macOS",
    description:
      "Fast speech-to-text for macOS. Go fully local or bring your own API keys. Press a shortcut, speak, get text.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#080604" />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
