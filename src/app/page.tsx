"use client";

import { useState } from "react";
import { motion, MotionConfig } from "motion/react";
import SimulatedApp from "./components/SimulatedApp";
import FnOverlay from "./components/FnOverlay";
import WorkflowDiagram from "./components/WorkflowDiagram";

const REPO = "ElwinLiu/handless";
const RELEASES_URL = `https://github.com/${REPO}/releases/latest`;

async function handleDownload(e: React.MouseEvent) {
  e.preventDefault();
  const isIntel =
    !navigator.userAgent.includes("ARM64") &&
    navigator.platform === "MacIntel" &&
    !("userAgentData" in navigator);
  const arch = isIntel ? "x64" : "aarch64";

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) throw new Error();
    const release = await res.json();
    const asset = release.assets?.find(
      (a: { name: string }) => a.name.endsWith(".dmg") && a.name.includes(arch)
    );
    window.location.href = asset?.browser_download_url ?? RELEASES_URL;
  } catch {
    window.location.href = RELEASES_URL;
  }
}

const FEATURES = [
  {
    title: "Local or Cloud — You Choose",
    description:
      "Run transcription fully on-device for privacy, or bring your own API keys for cloud-powered accuracy. Flexible by design.",
  },
  {
    title: "Press & Speak",
    description:
      "One keyboard shortcut to start. Hold, toggle, or always-on — speak naturally, get text instantly in any app.",
  },
{
    title: "LLM Polish",
    description:
      "Clean up transcriptions with OpenAI, Anthropic, Gemini, Groq, OpenRouter, Cerebras, Z.AI, Apple Intelligence, or your own endpoint. Mild, medium, or aggressive — your call.",
  },
  {
    title: "Dictionary & History",
    description:
      "Add custom terms so your jargon lands right. Full transcription history with daily stats and words-per-minute tracking.",
  },
  {
    title: "Native & Fast",
    description:
      "Built with Tauri and Rust. Lightweight, instant startup, native macOS feel. Voice activity detection stops recording when you stop speaking.",
  },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <main>
        {/* Nav */}
        <nav className="fixed top-0 z-50 w-full border-b border-border bg-bg">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
            <a
              href="/"
              className="flex items-center gap-2"
              aria-label="Handless home"
            >
              <img
                src="/logo.svg"
                alt=""
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="text-sm font-medium tracking-tight">
                Handless
              </span>
            </a>

            <div className="hidden sm:flex items-center gap-6">
              <a
                href="#features"
                className="text-sm text-muted transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded"
              >
                Features
              </a>
              <a
                href="#preview"
                className="text-sm text-muted transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded"
              >
                Preview
              </a>
              <a
                href={RELEASES_URL}
                onClick={handleDownload}
                className="inline-flex h-8 items-center rounded-md bg-accent px-3.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Download
              </a>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:hidden"
            >
              {menuOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>

          {menuOpen && (
            <div className="border-t border-border px-6 pb-4 pt-3 sm:hidden">
              <div className="flex flex-col gap-1">
                <a
                  href="#features"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-muted py-2 transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  Features
                </a>
                <a
                  href="#preview"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-muted py-2 transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  Preview
                </a>
                <a
                  href={RELEASES_URL}
                  onClick={handleDownload}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-accent text-sm font-medium text-white mt-2 transition-colors duration-150 hover:bg-accent-hover"
                >
                  Download
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero */}
        <section id="main-content" className="px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
          <motion.div
            className="mx-auto max-w-6xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.h1
              className="font-serif text-[clamp(3rem,8vw,6rem)] leading-[1] tracking-tight max-w-4xl"
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
            >
              Speech to text,
              <br />
              <em className="text-accent">BYOK</em>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-md text-lg leading-relaxed text-muted"
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
            >
              Press a shortcut, speak naturally, get text in any app. Go fully
              local for privacy or bring your own API keys (BYOK) for cloud
              accuracy.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
            >
              <a
                href={RELEASES_URL}
                onClick={handleDownload}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download for Mac
              </a>
              <a
                href="https://github.com/ElwinLiu/handless"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium text-text transition-colors duration-150 hover:border-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </motion.div>

            <motion.p
              className="mt-5 text-xs text-muted"
              variants={fadeUp}
              transition={{ duration: 0.7, ease }}
            >
              Free &amp; open source · macOS 12+
            </motion.p>
          </motion.div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-16 px-6 py-20">
          <motion.div
            className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            transition={{ duration: 0.6, ease }}
          >
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-tight">
                Everything you need to dictate
              </h2>
              <p className="mt-3 text-sm text-muted">
                Local, cloud, or both. No subscriptions.
              </p>
            </div>

            <div className="divide-y divide-border">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-8 py-5 first:pt-0 last:pb-0"
                >
                  <h3 className="text-sm font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How it works */}
        <section className="scroll-mt-16 px-6 py-20">
          <motion.div
            className="mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-tight">
              How it works
            </h2>
            <p className="mt-3 text-sm text-muted">
              Pick your engine, choose a post-processing model, set your polish level — done.
            </p>
            <div className="mt-12">
              <WorkflowDiagram />
            </div>
          </motion.div>
        </section>

        {/* See it in action */}
        <section id="preview" className="scroll-mt-16 px-6 py-20">
          <motion.div
            className="mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            transition={{ duration: 0.6, ease }}
          >
            <div className="text-center mb-12">
              <h2 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-tight">
                See it in action
              </h2>
              <p className="mt-3 text-sm text-muted max-w-md mx-auto">
                Watch the app in action. Try the Fn key below to see real-time captioning.
              </p>
            </div>

            <div className="flex flex-col gap-16 items-center">
              {/* Interactive app preview — full width */}
              <motion.div
                className="w-full"
                variants={fadeUp}
                transition={{ duration: 0.7, ease }}
              >
                <SimulatedApp />
              </motion.div>

              {/* Fn Key overlay demo — below */}
              <motion.div
                className="flex flex-col items-center"
                variants={fadeUp}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
              >
                <div className="text-center mb-6">
                  <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
                    Press & Speak
                  </p>
                  <p className="text-xs text-muted/60 max-w-[200px]">
                    Hold the Fn key, speak naturally, get text instantly
                  </p>
                </div>
                <FnOverlay />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt=""
                width={18}
                height={18}
                className="rounded-sm"
                loading="lazy"
              />
              <span className="text-xs text-muted">Handless</span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/ElwinLiu/handless"
                className="text-xs text-muted transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                aria-label="Handless on GitHub"
              >
                GitHub
              </a>
              <a
                href="https://github.com/ElwinLiu/handless/releases"
                className="text-xs text-muted transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                Releases
              </a>
            </div>
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}
