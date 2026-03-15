"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type AppTab = "models" | "polish" | "stats";

const SIDEBAR_ITEMS: { id: AppTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "models",
    label: "Models",
    icon: (
      <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
        <path d="M176,80a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,80Zm-48,32a32,32,0,1,1,32-32A32,32,0,0,1,128,112Zm88,40a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16H208A8,8,0,0,1,216,152Zm0,40a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16H208A8,8,0,0,1,216,192Z" />
      </svg>
    ),
  },
  {
    id: "polish",
    label: "Polish",
    icon: (
      <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
        <path d="M197.58,129.06l-51.61-19-19-51.65a15.92,15.92,0,0,0-29.88,0L78.07,110l-51.65,19a15.92,15.92,0,0,0,0,29.88L78,178l19.03,51.69a15.92,15.92,0,0,0,29.88,0l19-51.61,51.65-19a15.92,15.92,0,0,0,0-29.88ZM140.39,163a8,8,0,0,0-4.77,4.77L118,218.9,100.42,168a8,8,0,0,0-4.77-4.77L44.74,146l50.89-18.38a8,8,0,0,0,4.77-4.77L118,72,135.58,123a8,8,0,0,0,4.77,4.77l50.89,18.38ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z" />
      </svg>
    ),
  },
  {
    id: "stats",
    label: "History",
    icon: (
      <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
        <path d="M224,200H56V40a8,8,0,0,0-16,0V208a8,8,0,0,0,8,8H224a8,8,0,0,0,0-16Zm-66.34-69.66a8,8,0,0,0,11.32,0L192,107.31l23,23.03A8,8,0,0,0,226.34,119L197.66,90.34a8,8,0,0,0-11.32,0L163.31,113.4l-39-39A8,8,0,0,0,113,74.34L82.34,105a8,8,0,0,0,11.32,11.32L113,97l39,39Z" />
      </svg>
    ),
  },
];

/* ─── Models Page ─── */
function ModelsPage() {
  const [tab, setTab] = useState<"myModels" | "library">("myModels");
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-sm font-semibold mb-0.5">Models</h1>
        <p className="text-xs text-[#8a8480]">
          Choose your speech-to-text engine
        </p>
      </div>
      {/* Tabs */}
      <div className="flex gap-1 border-b border-[rgba(200,170,140,0.12)] mb-3">
        {(["myModels", "library"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                : "border-transparent text-[#f0ece8]/50 hover:text-[#f0ece8]/80"
            }`}
          >
            {t === "myModels" ? "My Models" : "Library"}
          </button>
        ))}
      </div>
      {tab === "myModels" ? (
        <div className="space-y-2">
          {/* Whisper Large v3 - Active */}
          <div className="flex flex-col rounded-xl px-3 py-2 gap-1.5 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.06] transition-colors duration-150">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[13px] font-semibold text-[#f0ece8]">
                Whisper Large v3
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--color-accent)] text-white font-medium">
                Active
              </span>
            </div>
            <p className="text-[#f0ece8]/60 text-xs leading-snug">
              OpenAI&apos;s most accurate model. Best for multilingual use.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM168,72h-24V48a8,8,0,0,0-16,0V72H104a8,8,0,0,0,0,16h24V216a8,8,0,0,0,16,0V88h24a8,8,0,0,0,0-16Z" />
                </svg>
                99+ languages
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M239.15,212.42l-56-112a8,8,0,0,0-14.31,0L131.55,176H99.09L63.15,100.42a8,8,0,0,0-14.31,0l-40,80A8,8,0,0,0,16,192H240a8,8,0,0,0,7.15-11.58Z" />
                </svg>
                Translate
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                97%
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                72%
              </span>
            </div>
          </div>

          {/* OpenAI Cloud - Verified */}
          <div className="flex flex-col rounded-xl px-3 py-2 gap-1.5 border border-[rgba(200,170,140,0.12)] bg-[var(--color-glass-bg)] transition-colors duration-150">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[13px] font-semibold text-[#f0ece8]">
                OpenAI STT
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium flex items-center gap-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" />
                </svg>
                Cloud
              </span>
            </div>
            <p className="text-[#f0ece8]/60 text-xs leading-snug">
              gpt-4o-transcribe
            </p>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                99+ languages
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                Translate
              </span>
            </div>
          </div>

          {/* Moonshine V2 - Available */}
          <div className="flex flex-col rounded-xl px-3 py-2 gap-1.5 border border-[rgba(200,170,140,0.12)] bg-[var(--color-glass-bg)] transition-colors duration-150">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[13px] font-semibold text-[#f0ece8]">
                Moonshine V2 Small
              </h3>
            </div>
            <p className="text-[#f0ece8]/60 text-xs leading-snug">
              Ultra-fast English-only model by Useful Sensors
            </p>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                English
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                95%
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex flex-col rounded-xl px-3 py-2 gap-1.5 border border-[rgba(200,170,140,0.12)] bg-[var(--color-glass-bg)]">
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-[#f0ece8]">
                Parakeet V3
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--color-accent)] text-white font-medium">
                Recommended
              </span>
            </div>
            <p className="text-[#f0ece8]/60 text-xs leading-snug">
              NVIDIA&apos;s latest ASR model. Excellent accuracy for European
              languages.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                26 languages
              </span>
              <span className="text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                96%
              </span>
              <span className="text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                88%
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded ml-auto">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,162.34,98.34L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34A8,8,0,0,0,82.34,109.66Z" />
                </svg>
                385 MB
              </span>
            </div>
          </div>
          <div className="flex flex-col rounded-xl px-3 py-2 gap-1.5 border border-[rgba(200,170,140,0.12)] bg-[var(--color-glass-bg)]">
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-[#f0ece8]">
                SenseVoice Int8
              </h3>
            </div>
            <p className="text-[#f0ece8]/60 text-xs leading-snug">
              Alibaba&apos;s multilingual model. Optimized for CJK languages.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                5 languages
              </span>
              <span className="text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                91%
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded ml-auto">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,162.34,98.34L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34A8,8,0,0,0,82.34,109.66Z" />
                </svg>
                234 MB
              </span>
            </div>
          </div>
          <div className="flex flex-col rounded-xl px-3 py-2 gap-1.5 border border-[rgba(200,170,140,0.12)] bg-[var(--color-glass-bg)]">
            <h3 className="text-[13px] font-semibold text-[#f0ece8]">
              Breeze ASR
            </h3>
            <p className="text-[#f0ece8]/60 text-xs leading-snug">
              Specialized for Taiwanese Mandarin
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded">
                Taiwanese Mandarin
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#f0ece8]/50 bg-[#8a8480]/10 px-1.5 py-0.5 rounded ml-auto">
                180 MB
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Polish Page ─── */
function PolishPage() {
  const [apiExpanded, setApiExpanded] = useState(false);
  const [promptExpanded, setPromptExpanded] = useState<string | null>(null);
  return (
    <div className="space-y-5">
      {/* API Section */}
      <div className="space-y-1.5">
        <div className="px-2 flex items-baseline gap-2">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-[#8a8480]">
            API Configuration
          </h2>
        </div>
        <div className="rounded-xl overflow-visible border border-[var(--color-glass-border)] shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
          {/* Collapsible summary */}
          <div
            className="flex items-center justify-between px-3 py-2 cursor-pointer select-none rounded-lg hover:bg-[rgba(200,170,140,0.05)] transition-colors"
            onClick={() => setApiExpanded(!apiExpanded)}
          >
            <div className="flex items-center gap-2 min-w-0">
              <motion.div
                animate={{ rotate: apiExpanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="shrink-0 text-[#8a8480]/50"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
              </motion.div>
              <span className="text-xs truncate">
                <span className="font-semibold text-[#f0ece8]/70">
                  Anthropic
                </span>
                <span className="text-[#8a8480]/50">
                  {" "}
                  · claude-sonnet-4-20250514
                </span>
              </span>
            </div>
            <svg
              width="12"
              height="12"
              viewBox="0 0 256 256"
              fill="#4ade80"
              className="shrink-0"
            >
              <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
            </svg>
          </div>

          {apiExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.15, ease }}
              className="border-t border-[var(--color-glass-border)] px-3 py-2 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8a8480]">Provider</span>
                <div className="w-[160px] h-7 rounded-md bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] px-2 flex items-center text-xs text-[#f0ece8]/80">
                  Anthropic
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8a8480]">API Key</span>
                <div className="w-[160px] h-7 rounded-md bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] px-2 flex items-center text-xs text-[#f0ece8]/40">
                  sk-ant-•••••••••
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8a8480]">Model</span>
                <div className="w-[160px] h-7 rounded-md bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] px-2 flex items-center text-xs text-[#f0ece8]/80">
                  claude-sonnet-4-20250514
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Prompts Section */}
      <div className="space-y-1.5">
        <div className="px-2 flex items-center justify-between">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-[#8a8480]">
            Prompts
          </h2>
          <div className="p-1 rounded-lg text-[#8a8480]/50">
            <svg
              width="12"
              height="12"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
            </svg>
          </div>
        </div>
        <div className="rounded-xl overflow-visible border border-[var(--color-glass-border)] shadow-[0_1px_4px_rgba(0,0,0,0.16)] divide-y divide-[var(--color-glass-border)]">
          {[
            {
              id: "clean",
              name: "Clean Up",
              builtin: true,
              shortcut: "fn",
              cost: "$1/2,400 req",
            },
            {
              id: "formal",
              name: "Formal",
              builtin: false,
              shortcut: "⌥ fn",
              cost: "$1/1,800 req",
            },
            {
              id: "casual",
              name: "Casual",
              builtin: false,
              shortcut: null,
              cost: "$1/2,100 req",
            },
          ].map((prompt) => (
            <div key={prompt.id}>
              <div
                className="flex items-center justify-between px-3 py-2 cursor-pointer select-none hover:bg-[rgba(200,170,140,0.05)] transition-colors"
                onClick={() =>
                  setPromptExpanded(
                    promptExpanded === prompt.id ? null : prompt.id,
                  )
                }
              >
                <div className="flex items-center gap-2 min-w-0">
                  <motion.div
                    animate={{
                      rotate: promptExpanded === prompt.id ? 180 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                    }}
                    className="shrink-0 text-[#8a8480]/50"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                    >
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </motion.div>
                  <div className="min-w-0 leading-tight">
                    <span className="text-xs font-semibold text-[#f0ece8]/70 truncate block">
                      {prompt.name}
                    </span>
                    <span className="text-[10px] text-[#8a8480]/40 flex items-center gap-1">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                      >
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-72V80a8,8,0,0,1,16,0v64a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,188Z" />
                      </svg>
                      {prompt.cost}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {prompt.shortcut && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded border border-[var(--color-glass-border)] text-[#f0ece8]/50 font-mono">
                      {prompt.shortcut}
                    </span>
                  )}
                  {prompt.builtin && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-glass-bg)] text-[#8a8480]">
                      Built-in
                    </span>
                  )}
                </div>
              </div>
              {promptExpanded === prompt.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-3 pb-2 pt-1 space-y-2"
                >
                  <div className="space-y-1">
                    <label className="text-[9px] font-medium uppercase tracking-wider text-[#8a8480]/50 block">
                      Instructions
                    </label>
                    <div className="min-h-[60px] rounded-md bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] px-2 py-1.5 text-[11px] text-[#f0ece8]/60 leading-relaxed">
                      {prompt.id === "clean"
                        ? "Fix grammar, punctuation, and formatting. Keep the original meaning and tone. Remove filler words."
                        : prompt.id === "formal"
                          ? "Rewrite in a formal, professional tone. Fix grammar and structure into clear paragraphs."
                          : "Rewrite in a casual, conversational tone. Keep it natural and friendly."}
                    </div>
                  </div>
                  {prompt.builtin && (
                    <p className="text-[10px] text-[#8a8480]/40">
                      Built-in prompts cannot be edited
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Stats Page ─── */
function StatsPage() {
  const [range, setRange] = useState("month");
  const ranges = ["Today", "3 Days", "Week", "Month", "All"];
  const chartPoints = [
    { x: 0, y: 45 },
    { x: 1, y: 52 },
    { x: 2, y: 48 },
    { x: 3, y: 67 },
    { x: 4, y: 55 },
    { x: 5, y: 72 },
    { x: 6, y: 63 },
    { x: 7, y: 80 },
    { x: 8, y: 75 },
    { x: 9, y: 88 },
    { x: 10, y: 82 },
    { x: 11, y: 95 },
  ];
  const chartWidth = 280;
  const chartHeight = 100;
  const padding = { top: 8, right: 8, bottom: 20, left: 28 };
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;
  const maxY = 100;
  const pathD = chartPoints
    .map((p, i) => {
      const x = padding.left + (p.x / 11) * innerW;
      const y = padding.top + innerH - (p.y / maxY) * innerH;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  const months = [
    "2/14",
    "2/17",
    "2/20",
    "2/23",
    "2/26",
    "3/1",
    "3/4",
    "3/7",
    "3/10",
    "3/13",
  ];

  return (
    <div className="space-y-3">
      <div className="px-1">
        <h2 className="text-[10px] font-medium text-[#8a8480] uppercase tracking-wide">
          Stats
        </h2>
      </div>
      {/* Range selector */}
      <div className="px-1 flex flex-wrap items-center gap-1">
        {ranges.map((r) => {
          const key = r.toLowerCase().replace(" ", "");
          return (
            <button
              key={r}
              onClick={() => setRange(key)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                range === key
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[rgba(200,170,140,0.06)] border border-[var(--color-glass-border)] text-[#8a8480] hover:text-[#f0ece8]"
              }`}
            >
              {r}
            </button>
          );
        })}
      </div>
      {/* Summary cards */}
      <div className="px-1 grid grid-cols-2 gap-1.5">
        {[
          {
            icon: "💬",
            label: "Words Spoken",
            value: "12,847",
            sub: "This month",
          },
          {
            icon: "⏱",
            label: "Recording Time",
            value: "2h 14m",
            sub: "This month",
          },
          {
            icon: "⚡",
            label: "Avg WPM",
            value: "142",
            sub: "This month",
          },
          {
            icon: "🔢",
            label: "Transcriptions",
            value: "89",
            sub: "This month",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[rgba(200,170,140,0.06)] border border-[var(--color-glass-border)] rounded px-2 py-1.5"
          >
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[9px]">{stat.icon}</span>
              <span className="text-[9px] text-[#8a8480] uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
            <p className="text-sm font-semibold tabular-nums text-[#f0ece8]">
              {stat.value}
            </p>
            <p className="text-[9px] text-[#8a8480]/60">{stat.sub}</p>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div className="space-y-1">
        <div className="px-1">
          <h3 className="text-[10px] font-medium text-[#8a8480] uppercase tracking-wide">
            WPM Over Time
          </h3>
        </div>
        <div className="bg-[rgba(200,170,140,0.06)] border border-[var(--color-glass-border)] rounded px-2 py-2">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full"
            style={{ height: "auto" }}
          >
            {/* Y axis labels */}
            {[0, 50, 100].map((v) => (
              <text
                key={v}
                x={padding.left - 4}
                y={padding.top + innerH - (v / maxY) * innerH + 3}
                textAnchor="end"
                className="fill-[#8a8480]"
                style={{ fontSize: "8px" }}
              >
                {v}
              </text>
            ))}
            {/* X axis labels */}
            {months.map((m, i) => (
              <text
                key={m}
                x={padding.left + (i / (months.length - 1)) * innerW}
                y={chartHeight - 4}
                textAnchor="middle"
                className="fill-[#8a8480]"
                style={{ fontSize: "7px" }}
              >
                {m}
              </text>
            ))}
            {/* Line */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dots */}
            {chartPoints.map((p) => (
              <circle
                key={p.x}
                cx={padding.left + (p.x / 11) * innerW}
                cy={padding.top + innerH - (p.y / maxY) * innerH}
                r="2"
                fill="var(--color-accent)"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Simulated App ─── */
export default function SimulatedApp() {
  const [activeTab, setActiveTab] = useState<AppTab>("models");

  return (
    <div className="w-full max-w-[540px] mx-auto">
      {/* macOS window chrome */}
      <div className="rounded-xl overflow-hidden border border-[rgba(200,170,140,0.12)] shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_1px_rgba(0,0,0,0.3)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#131110] border-b border-[rgba(200,170,140,0.08)]">
          <div className="flex gap-1.5">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[11px] text-[#8a8480]/60 ml-auto mr-auto">
            Handless
          </span>
        </div>

        {/* Body: sidebar + content */}
        <div className="flex min-h-[380px] bg-[#080604]">
          {/* Sidebar */}
          <div className="w-[100px] shrink-0 border-r border-[rgba(200,170,140,0.08)] bg-[#0c0a08] px-2 py-3 flex flex-col gap-0.5">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-[var(--color-accent)]/12 text-[var(--color-accent)]"
                    : "text-[#8a8480] hover:text-[#f0ece8] hover:bg-[rgba(200,170,140,0.06)]"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 max-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease }}
              >
                {activeTab === "models" && <ModelsPage />}
                {activeTab === "polish" && <PolishPage />}
                {activeTab === "stats" && <StatsPage />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
