"use client";

import { motion } from "motion/react";

const FEATURES = [
  {
    title: "100% Local",
    description:
      "Every transcription runs on-device. Your voice never leaves your Mac.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 10h0" />
        <path d="M10 10h0" />
        <path d="M14 10h0" />
        <path d="M6 14h4" />
      </svg>
    ),
  },
  {
    title: "Press & Speak",
    description:
      "One keyboard shortcut to start. Speak naturally, get text instantly in any app.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
  {
    title: "99+ Languages",
    description:
      "Whisper, Parakeet, Moonshine, SenseVoice — choose the engine that fits your language.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "LLM Polish",
    description:
      "Clean up transcriptions with AI. Fix grammar, reformat, or restructure — all optional.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      </svg>
    ),
  },
  {
    title: "Multiple Engines",
    description:
      "Whisper, Parakeet V2/V3, Moonshine, SenseVoice, Breeze ASR — or connect cloud APIs.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" x2="4" y1="22" y2="15" />
      </svg>
    ),
  },
  {
    title: "Native & Fast",
    description:
      "Built with Tauri and Rust. Lightweight, instant startup, feels like a native macOS utility.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

const ENGINES = [
  {
    name: "Whisper",
    variants: "Small, Medium, Turbo, Large",
    languages: "99+ languages",
    badge: "Most popular",
  },
  {
    name: "Parakeet",
    variants: "V2, V3",
    languages: "English & 25 European languages",
    badge: "NVIDIA",
  },
  {
    name: "Moonshine",
    variants: "Tiny, Small, Medium",
    languages: "English",
    badge: "Ultra-fast",
  },
  {
    name: "SenseVoice",
    variants: "Standard",
    languages: "Chinese, English, Japanese, Korean, Cantonese",
    badge: "Multilingual",
  },
  {
    name: "Breeze ASR",
    variants: "Standard",
    languages: "Taiwanese Mandarin",
    badge: "Specialized",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border backdrop-blur-xl bg-bg/80">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2.5" aria-label="Handless home">
            <img
              src="/logo.png"
              alt=""
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="text-sm font-semibold tracking-tight">
              Handless
            </span>
          </a>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-muted transition-colors duration-200 hover:text-text"
            >
              Features
            </a>
            <a
              href="#engines"
              className="text-sm text-muted transition-colors duration-200 hover:text-text"
            >
              Engines
            </a>
            <a
              href="https://github.com/nicepkg/handless/releases"
              className="inline-flex h-8 items-center rounded-lg bg-accent px-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Download
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-14">
        {/* Glow */}
        <div
          className="pointer-events-none absolute top-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #ef6f2f 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <motion.div
          className="relative z-10 flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <img
              src="/logo.png"
              alt="Handless logo"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </motion.div>

          <motion.h1
            className="mt-8 max-w-2xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl"
            style={{ textWrap: "balance" }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Speech to text,
            <br />
            <span className="text-accent">entirely on your Mac</span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-lg text-lg leading-relaxed text-muted"
            style={{ textWrap: "pretty" }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Press a shortcut, speak naturally, get text in any app. Fast, private, and
            runs locally — your voice never leaves your machine.
          </motion.p>

          <motion.div
            className="mt-8 flex items-center gap-4"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <a
              href="https://github.com/nicepkg/handless/releases"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-6 text-base font-medium text-white transition-colors duration-200 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
              href="https://github.com/nicepkg/handless"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border-strong bg-glass px-6 text-base font-medium text-text transition-colors duration-200 hover:bg-glass-heavy focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <svg
                width="16"
                height="16"
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
            className="mt-4 text-xs text-muted/60"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Free & open source &middot; macOS 12+
          </motion.p>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-16 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ textWrap: "balance" }}
            >
              Everything You Need to Dictate
            </h2>
            <p className="mt-3 text-muted">
              No setup, no cloud, no subscriptions. Just your voice.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.title}
                className="group rounded-2xl border border-border bg-glass p-6 transition-colors duration-200 hover:border-border-strong hover:bg-glass-heavy"
                variants={fadeUp}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-glass-heavy text-accent">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Engines */}
      <section id="engines" className="scroll-mt-16 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ textWrap: "balance" }}
            >
              Choose Your Engine
            </h2>
            <p className="mt-3 text-muted">
              5 local engines with different strengths. Pick what works for your language and speed needs.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {ENGINES.map((engine) => (
              <motion.div
                key={engine.name}
                className="rounded-2xl border border-border bg-glass p-5 transition-colors duration-200 hover:border-border-strong hover:bg-glass-heavy"
                variants={fadeUp}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-semibold">{engine.name}</h3>
                  <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                    {engine.badge}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{engine.variants}</p>
                <p className="mt-1 text-sm text-muted/70">{engine.languages}</p>
              </motion.div>
            ))}

            {/* Cloud option card */}
            <motion.div
              className="rounded-2xl border border-dashed border-border-strong bg-transparent p-5"
              variants={fadeUp}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-muted">Cloud APIs</h3>
                <span className="rounded-md bg-glass-heavy px-2 py-0.5 text-xs font-medium text-muted">
                  Optional
                </span>
              </div>
              <p className="mt-2 text-sm text-muted/70">
                Connect OpenAI Whisper or Soniox for cloud-powered transcription when you need it.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ textWrap: "balance" }}
          >
            Start Dictating Today
          </h2>
          <p className="mt-3 text-muted">
            Free, open source, and ready in seconds.
          </p>
          <div className="mt-8">
            <a
              href="https://github.com/nicepkg/handless/releases"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-6 text-base font-medium text-white transition-colors duration-200 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Download for Mac
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt=""
              width={20}
              height={20}
              className="rounded"
            />
            <span className="text-xs text-muted">Handless</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/nicepkg/handless"
              className="text-xs text-muted transition-colors duration-200 hover:text-text"
              aria-label="Handless on GitHub"
            >
              GitHub
            </a>
            <a
              href="https://github.com/nicepkg/handless/releases"
              className="text-xs text-muted transition-colors duration-200 hover:text-text"
            >
              Releases
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
