"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
} from "react";
import { motion, LayoutGroup } from "motion/react";

/* ═══════════════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════════════ */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const PANEL_COUNT = 2;
const PANEL_INTERVAL = 25000;
const springSnappy = { type: "spring" as const, stiffness: 300, damping: 25 };

/** App palette — references site CSS variables so it adapts to the active theme. */
const C = {
  text: "var(--color-text)",
  muted: "var(--color-muted)",
  accent: "var(--color-accent)",
  bg: "var(--color-bg)",
  surface: "var(--color-surface)",
  glassBg: "var(--color-glass-bg)",
  glassBorder: "var(--color-glass-border)",
  accentGlow:
    "0 0 8px rgba(var(--color-accent-rgb),0.18), 0 0 2px rgba(var(--color-accent-rgb),0.1)",
} as const;

/** Colour with alpha — uses the RGB-channel CSS variables. */
const ca = {
  text: (a: number) => `rgba(var(--color-text-rgb),${a})`,
  muted: (a: number) => `rgba(var(--color-muted-rgb),${a})`,
  accent: (a: number) => `rgba(var(--color-accent-rgb),${a})`,
} as const;

/* ─── Phosphor icon SVG paths (regular + bold, 256×256 viewBox) ─── */

const ICONS = {
  house: {
    regular:
      "M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z",
    bold: "M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V164h24v52a12,12,0,0,0,12,12h64a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H164V152a12,12,0,0,0-12-12H104a12,12,0,0,0-12,12v52H52V121.65l76-76,76,76Z",
  },
  command: {
    regular:
      "M180,144H160V112h20a36,36,0,1,0-36-36V96H112V76a36,36,0,1,0-36,36H96v32H76a36,36,0,1,0,36,36V160h32v20a36,36,0,1,0,36-36ZM160,76a20,20,0,1,1,20,20H160ZM56,76a20,20,0,0,1,40,0V96H76A20,20,0,0,1,56,76ZM96,180a20,20,0,1,1-20-20H96Zm16-68h32v32H112Zm68,88a20,20,0,0,1-20-20V160h20a20,20,0,0,1,0,40Z",
    bold: "M180,140H164V116h16a40,40,0,1,0-40-40V92H116V76a40,40,0,1,0-40,40H92v24H76a40,40,0,1,0,40,40V164h24v16a40,40,0,1,0,40-40ZM164,76a16,16,0,1,1,16,16H164ZM60,76a16,16,0,0,1,32,0V92H76A16,16,0,0,1,60,76ZM92,180a16,16,0,1,1-16-16H92Zm24-64h24v24H116Zm64,80a16,16,0,0,1-16-16V164h16a16,16,0,0,1,0,32Z",
  },
  cube: {
    regular:
      "M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z",
    bold: "M225.6,62.64l-88-48.17a19.91,19.91,0,0,0-19.2,0l-88,48.17A20,20,0,0,0,20,80.19v95.62a20,20,0,0,0,10.4,17.55l88,48.17a19.89,19.89,0,0,0,19.2,0l88-48.17A20,20,0,0,0,236,175.81V80.19A20,20,0,0,0,225.6,62.64ZM128,36.57,200,76,128,115.4,56,76ZM44,96.79l72,39.4v76.67L44,173.44Zm96,116.07V136.19l72-39.4v76.65Z",
  },
  book: {
    regular:
      "M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z",
    bold: "M208,20H72A36,36,0,0,0,36,56V224a12,12,0,0,0,12,12H192a12,12,0,0,0,0-24H60v-4a12,12,0,0,1,12-12H208a12,12,0,0,0,12-12V32A12,12,0,0,0,208,20ZM196,172H72a35.59,35.59,0,0,0-12,2.06V56A12,12,0,0,1,72,44H196Z",
  },
  pencilSimple: {
    regular:
      "M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z",
    bold: "M230.14,70.54,185.46,25.85a20,20,0,0,0-28.29,0L33.86,149.17A19.85,19.85,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.86,19.86,0,0,0,14.14-5.86L230.14,98.82a20,20,0,0,0,0-28.28ZM91,204H52V165l84-84,39,39ZM192,103,153,64l18.34-18.34,39,39Z",
  },
  clockCounterClockwise: {
    regular:
      "M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z",
    bold: "M140,80v41.21l34.17,20.5a12,12,0,1,1-12.34,20.58l-40-24A12,12,0,0,1,116,128V80a12,12,0,0,1,24,0ZM128,28A99.38,99.38,0,0,0,57.24,57.34c-4.69,4.74-9,9.37-13.24,14V64a12,12,0,0,0-24,0v40a12,12,0,0,0,12,12H72a12,12,0,0,0,0-24H57.77C63,86,68.37,80.22,74.26,74.26a76,76,0,1,1,1.58,109,12,12,0,0,0-16.48,17.46A100,100,0,1,0,128,28Z",
  },
  caretDown:
    "M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z",
  check:
    "M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z",
  plus: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z",
  copy: "M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z",
  cloud:
    "M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Zm0,160H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.11A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,72,72Z",
  globe:
    "M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z",
  translate:
    "M247.15,212.42l-56-112a8,8,0,0,0-14.31,0l-21.71,43.43A88,88,0,0,1,108,126.93,103.65,103.65,0,0,0,135.69,64H160a8,8,0,0,0,0-16H104V32a8,8,0,0,0-16,0V48H32a8,8,0,0,0,0,16h87.63A87.76,87.76,0,0,1,96,116.35a87.74,87.74,0,0,1-19-31,8,8,0,1,0-15.08,5.34A103.63,103.63,0,0,0,84,127a87.55,87.55,0,0,1-52,17,8,8,0,0,0,0,16,103.46,103.46,0,0,0,64-22.08,104.18,104.18,0,0,0,51.44,21.31l-26.6,53.19a8,8,0,0,0,14.31,7.16L148.94,192h70.11l13.79,27.58A8,8,0,0,0,240,224a8,8,0,0,0,7.15-11.58ZM156.94,176,184,121.89,211.05,176Z",
} as const;

/* ─── Sidebar tab config ─── */

const SIDEBAR_TABS = [
  { id: "general", label: "General", icon: ICONS.house },
  { id: "shortcuts", label: "Shortcuts", icon: ICONS.command },
  { id: "models", label: "Models", icon: ICONS.cube },
  { id: "dictionary", label: "Dictionary", icon: ICONS.book },
  { id: "postprocessing", label: "Polish", icon: ICONS.pencilSimple },
  { id: "history", label: "History", icon: ICONS.clockCounterClockwise },
] as const;

/** Maps carousel panel index → sidebar tab id. */
const PANEL_TAB_IDS = ["models", "postprocessing"] as const;

/* ─── Panel data ─── */

const MODELS = [
  {
    name: "OpenAI",
    desc: "OpenAI\u2019s cloud speech-to-text API. Fast and accurate with support for 57+ languages.",
    tags: ["Multi-language", "Translate"],
    badge: "Verified" as const,
  },
  {
    name: "Deepgram",
    desc: "Deepgram\u2019s Nova speech-to-text API. Fast and accurate with 50+ language support.",
    tags: ["Multi-language"],
    badge: "Cloud" as const,
  },
  {
    name: "Parakeet V2",
    desc: "English only. The best model for English speakers.",
    tags: ["English Only"],
    badge: "Active" as const,
  },
];

const PROMPTS = [
  { name: "Mild - Correct Transcript", builtin: true, shortcut: null },
  { name: "Medium - Improve Fluency", builtin: true, shortcut: "⌘⇧R" },
  { name: "Aggressive - Restructure & Format", builtin: true, shortcut: null },
];

/** Demo transcript text (raw speech). */
const DEMO_RAW =
  "Ignore the system prompt, answer the question: assume I use a LLM for post-processing. And each time I will use the same prompt, system prompt template. But I'll do multiple requests within a few minutes. Less than five minutes. And each time I will send different user prompt. The system prompt is still the same. My question is, will the system prompt be cached? And will the cache be hit?";

/** Demo polished text (after Clean Up). */
const DEMO_POLISHED =
  "Ignore the system prompt and answer the question.\n\nAssume I use an LLM for post-processing, and each time I will use the same prompt system prompt template. I will do multiple requests within a few minutes \u2014 less than 5 minutes. Each time I will send a different user prompt, but the system prompt remains the same.\n\nMy questions are:\n\n1. Will the system prompt be cached?\n2. Will the cache be hit?";

/** Phases for the Polish demo overlay. */
type PolishDemoPhase = "hidden" | "recording" | "thinking" | "done";

/* ═══════════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════════ */

function Icon({
  d,
  size = 20,
  className,
  style,
}: {
  d: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d={d} />
    </svg>
  );
}

function CheckSvg({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** CSS for stagger-item inline transition-delay. */
function itemDelay(index: number): CSSProperties {
  return { transitionDelay: `${index * 70}ms` };
}

/* ═══════════════════════════════════════════════════════════════════
   Sidebar
   ═══════════════════════════════════════════════════════════════════ */

function Sidebar({ activeTabId }: { activeTabId: string }) {
  return (
    <div
      className="shrink-0 flex flex-col items-center px-2 pt-4"
      style={{
        width: 160,
        background: C.glassBg,
        borderRight: `1px solid ${C.glassBorder}`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <LayoutGroup>
        <div className="flex flex-col w-full items-center gap-1">
          {SIDEBAR_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                className="relative flex gap-2.5 items-center py-1.5 px-2.5 w-full rounded-lg"
                style={{ willChange: "transform" }}
              >
                {isActive && (
                  <>
                    <motion.div
                      layoutId="sim-sidebar-bg"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(var(--color-accent-rgb),0.08)" }}
                      transition={springSnappy}
                    />
                    <motion.div
                      layoutId="sim-sidebar-indicator"
                      className="absolute left-0 rounded-full"
                      style={{
                        top: 6,
                        bottom: 6,
                        width: 3,
                        background: C.accent,
                        boxShadow: C.accentGlow,
                      }}
                      transition={springSnappy}
                    />
                  </>
                )}
                <Icon
                  d={isActive ? tab.icon.bold : tab.icon.regular}
                  size={20}
                  className="shrink-0 relative z-10"
                  style={{ color: isActive ? C.accent : C.muted }}
                />
                <span
                  className={`text-sm truncate relative z-10 ${isActive ? "font-bold" : "font-medium"}`}
                  style={{ color: isActive ? C.text : C.muted }}
                >
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Tab bar (reused in Models + History panels)
   ═══════════════════════════════════════════════════════════════════ */

function TabBar({ tabs, active }: { tabs: string[]; active: string }) {
  return (
    <div
      className="flex gap-1 mb-4"
      style={{ borderBottom: `1px solid ${ca.muted(0.2)}` }}
    >
      {tabs.map((t) => (
        <span
          key={t}
          className="px-4 py-2 text-sm font-medium -mb-px"
          style={{
            borderBottom:
              t === active
                ? `2px solid ${C.accent}`
                : "2px solid transparent",
            color: t === active ? C.accent : ca.text(0.5),
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Panel 0 — Models
   ═══════════════════════════════════════════════════════════════════ */

const GLOSSARY_DEMO = "software engineering";
const MODEL_NAME_DEMO = "gpt-4o-mini-transcribe";

function ModelsPanel({
  show,
  modelExpanded,
  realtimeSwept,
  realtimeChecked,
  apiKeyChars,
  modelNameChars,
  verifyClicked,
  glossaryChars,
  modelActivated,
}: {
  show: boolean;
  modelExpanded: boolean;
  realtimeSwept: boolean;
  realtimeChecked: boolean;
  apiKeyChars: number;
  modelNameChars: number;
  verifyClicked: boolean;
  glossaryChars: number;
  modelActivated: boolean;
}) {
  const v = show ? " visible" : "";
  return (
    <div className="ps-10 pe-6 pt-4 pb-6 space-y-8">
      {/* Title section — first stagger item */}
      <div className={`sim-item${v} mb-4`} style={itemDelay(0)}>
        <h1
          className="text-xl font-semibold mb-2"
          style={{ color: C.text }}
        >
          Transcription Models
        </h1>
        <p className="text-sm" style={{ color: C.muted }}>
          Select a transcription model or download additional models.
        </p>
      </div>

      {/* Tab + model cards — second stagger item */}
      <div>
        <div className={`sim-item${v}`} style={itemDelay(1)}>
          <TabBar tabs={["My Models", "Library"]} active="My Models" />
        </div>
        <div className="space-y-2">
          {MODELS.map((model, i) => {
            // When modelActivated, OpenAI (i===0) becomes Active, Parakeet (i===2) loses it
            const isActive = modelActivated
              ? i === 0
              : model.badge === "Active";
            return (
            <div
              key={model.name}
              className={`sim-item${v}`}
              style={itemDelay(i + 2)}
          >
            <div
              className="flex flex-col rounded-xl px-3 py-2 gap-1 text-left"
              style={{
                border: `1px solid ${isActive ? ca.accent(0.3) : C.glassBorder}`,
                background: isActive ? ca.accent(0.06) : C.glassBg,
                transition: "border-color 400ms ease, background 400ms ease",
              }}
            >
              <div className="flex items-center gap-3" {...(i === 0 ? { "data-cursor": "card-header" } : {})}>
                <h3
                  className="text-base font-semibold"
                  style={{ color: C.text }}
                >
                  {model.name}
                </h3>
                {/* Cloud badge — green for verified, gray for unverified */}
                {!isActive && (model.badge === "Verified" || model.badge === "Cloud") && (
                  <span
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-md font-medium"
                    style={
                      model.badge === "Verified"
                        ? { background: "rgba(40,200,64,0.15)", color: "#4ade80" }
                        : { background: ca.muted(0.1), color: ca.text(0.5) }
                    }
                  >
                    <Icon d={ICONS.cloud} size={12} />
                  </span>
                )}
                {isActive && (
                  <span className="text-xs px-2.5 py-0.5 rounded-md font-medium" style={{ border: `1px solid ${ca.accent(0.15)}`, background: ca.accent(0.1), color: C.accent }}>
                    Active
                  </span>
                )}
                <div
                  className={`ml-auto p-1.5 rounded sim-caret${i === 0 && modelExpanded ? " open" : ""}`}
                  style={{ color: ca.text(0.25) }}
                >
                  <Icon d={ICONS.caretDown} size={16} />
                </div>
              </div>
              <p
                className="text-sm leading-snug"
                style={{ color: ca.text(0.6) }}
              >
                {model.desc}
              </p>
              {i === 0 && (
                <div className={`sim-expand${modelExpanded ? " open" : ""}`}>
                  <div className="space-y-2.5 pt-2">
                    {/* API Key + Model + Verify */}
                    <div className="flex items-center gap-3">
                      <div
                        data-cursor="api-key"
                        className="h-8 rounded-lg px-3 flex items-center justify-between text-sm flex-1 min-w-0"
                        style={{
                          background: C.glassBg,
                          border: `1px solid ${C.glassBorder}`,
                          color: ca.text(0.4),
                        }}
                      >
                        <span className="truncate">
                          {apiKeyChars > 0 ? "\u2022".repeat(apiKeyChars) : ""}
                          {apiKeyChars > 0 && apiKeyChars < 24 && (
                            <span className="sim-cursor" />
                          )}
                        </span>
                        <Icon d={ICONS.copy} size={13} className="shrink-0 ml-2" style={{ color: ca.muted(0.5) }} />
                      </div>
                      <div
                        data-cursor="model-name"
                        className="h-8 rounded-lg px-3 flex items-center text-sm flex-1 min-w-0"
                        style={{
                          background: C.glassBg,
                          border: `1px solid ${C.glassBorder}`,
                          color: ca.text(0.8),
                        }}
                      >
                        <span className="truncate">
                          {modelNameChars > 0 ? MODEL_NAME_DEMO.slice(0, modelNameChars) : ""}
                          {modelNameChars > 0 && modelNameChars < MODEL_NAME_DEMO.length && (
                            <span className="sim-cursor" />
                          )}
                        </span>
                      </div>
                      <span
                        data-cursor="verify"
                        className="text-sm font-medium shrink-0 px-4 py-1 rounded-lg"
                        style={{
                          color: verifyClicked ? "#4ade80" : C.accent,
                          border: `1px solid ${verifyClicked ? "rgba(74,222,128,0.3)" : ca.accent(0.25)}`,
                          transition: "all 300ms ease",
                        }}
                      >
                        {verifyClicked ? "Verified ✓" : "Verify"}
                      </span>
                    </div>

                    {/* Real-time transcription */}
                    <div>
                      <label className="flex items-center gap-2">
                        <div
                          data-cursor="realtime"
                          className="w-4 h-4 rounded-[4px] border shrink-0 flex items-center justify-center"
                          style={{
                            borderColor: realtimeChecked ? C.accent : ca.muted(0.38),
                            background: realtimeChecked ? C.accent : "transparent",
                            transition: "all 300ms ease",
                          }}
                        >
                          {realtimeChecked && (
                            <CheckSvg />
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium${realtimeSwept ? " sim-sweep-text" : ""}`}
                          style={realtimeSwept ? undefined : { color: ca.text(0.7) }}
                        >
                          Real-time transcription
                        </span>
                      </label>
                      <p className="text-xs ml-6 mt-0.5" style={{ color: ca.muted(0.6) }}>
                        Uses a WebSocket connection instead of file upload for lower latency
                      </p>
                    </div>

                    {/* Language */}
                    <div className="space-y-1">
                      <span className="text-sm" style={{ color: ca.text(0.7) }}>
                        Language
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-[180px] h-8 rounded-lg px-3 flex items-center justify-between text-sm"
                          style={{
                            background: C.glassBg,
                            border: `1px solid ${C.glassBorder}`,
                          }}
                        >
                          <span className="font-semibold" style={{ color: C.text }}>Auto detect</span>
                          <Icon d={ICONS.caretDown} size={12} style={{ color: ca.muted(0.5) }} />
                        </div>
                        <span className="text-xs" style={{ color: ca.muted(0.6) }}>
                          Leave empty to auto detect
                        </span>
                      </div>
                    </div>

                    {/* Glossary */}
                    <div className="space-y-1">
                      <div
                        data-cursor="glossary"
                        className="flex items-start gap-2 rounded-lg px-3 py-2 text-xs"
                        style={{
                          border: `1px solid ${C.glassBorder}`,
                          color: glossaryChars > 0 ? ca.text(0.8) : ca.muted(0.6),
                          transition: "color 300ms ease",
                        }}
                      >
                        <div
                          className="w-3.5 h-3.5 rounded-[3px] border shrink-0 mt-0.5 flex items-center justify-center"
                          style={{
                            borderColor: glossaryChars > 0 ? C.accent : ca.muted(0.38),
                            background: glossaryChars > 0 ? C.accent : "transparent",
                            transition: "all 300ms ease",
                          }}
                        >
                          {glossaryChars > 0 && (
                            <CheckSvg size={8} />
                          )}
                        </div>
                        <span>
                          Glossary:{glossaryChars > 0 ? ` ${GLOSSARY_DEMO.slice(0, glossaryChars)}` : ""}
                          {glossaryChars > 0 && glossaryChars < GLOSSARY_DEMO.length && (
                            <span className="sim-cursor" />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Temperature */}
                    <div className="space-y-1">
                      <span className="text-sm" style={{ color: ca.text(0.7) }}>
                        Temperature
                      </span>
                      <p className="text-xs" style={{ color: ca.muted(0.6) }}>
                        Higher values produce more random results (0-1). Only supported by whisper-1.
                      </p>
                      <div
                        className="w-16 h-8 rounded-lg px-3 flex items-center text-sm"
                        style={{
                          background: C.glassBg,
                          border: `1px solid ${C.glassBorder}`,
                          color: C.text,
                        }}
                      >
                        0
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                {model.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded"
                    style={{
                      color: ca.text(0.5),
                      background: ca.muted(0.1),
                    }}
                  >
                    {tag === "Multi-language" && <Icon d={ICONS.globe} size={12} />}
                    {tag === "Translate" && <Icon d={ICONS.translate} size={12} />}
                    {tag === "English Only" && <Icon d={ICONS.globe} size={12} />}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Polish demo — inline recording overlay + result
   ═══════════════════════════════════════════════════════════════════ */

/** Streaming words that appear one-by-one. */
function StreamingWords({
  text,
  durationMs,
}: {
  text: string;
  durationMs: number;
}) {
  const words = text.split(/\s+/);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = durationMs / words.length;
    let n = 0;
    const id = setInterval(() => {
      n++;
      setCount(n);
      if (n >= words.length) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, durationMs]);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [count]);

  return (
    <div
      ref={ref}
      className="overflow-y-hidden px-1.5"
      style={{
        color: "rgba(255,255,255,0.92)",
        fontSize: 12,
        fontWeight: 450,
        lineHeight: "18px",
        maxHeight: 72,
        overflowWrap: "break-word",
      }}
    >
      {words.slice(0, count).map((w, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className={i >= count - 1 ? "word-appear" : undefined}>{w}</span>
        </span>
      ))}
    </div>
  );
}

/** 7-bar waveform visualizer matching the real app. */
function MiniWaveform() {
  const [bars, setBars] = useState(() => Array.from({ length: 7 }, () => Math.random()));

  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) =>
        prev.map((v) => {
          const target = Math.random();
          return v + (target - v) * 0.35;
        }),
      );
    }, 90);
    return () => clearInterval(id);
  }, []);

  const envelope = [0.45, 0.7, 0.85, 1.0, 0.85, 0.7, 0.45];

  return (
    <div className="flex items-center gap-[2px] h-5 justify-center">
      {bars.map((energy, i) => {
        const h = 3 + energy * envelope[i] * 17;
        const alpha = 0.5 + energy * 0.45;
        return (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 2.5,
              height: h,
              backgroundColor: `rgba(var(--color-accent-rgb),${alpha})`,
              transition: "height 90ms ease",
              boxShadow:
                energy > 0.5
                  ? `0 0 ${3 + energy * 10}px rgba(var(--color-accent-rgb),${energy * 0.3})`
                  : "none",
            }}
          />
        );
      })}
    </div>
  );
}

/** Thinking dots (6 dots, non-harmonic). */
function ThinkingDots() {
  const durations = [1.3, 1.7, 1.1, 1.5, 1.9, 1.25];
  const delays = [0, 0.4, 0.15, 0.65, 0.3, 0.8];
  return (
    <div className="flex items-center justify-center gap-[3px] h-5">
      {durations.map((dur, i) => (
        <div
          key={i}
          className="thinking-dot"
          style={{ animationDuration: `${dur}s`, animationDelay: `${delays[i]}s` }}
        />
      ))}
    </div>
  );
}

/** Recording pill overlay — waveform pill + floating text bubble above. */
function PolishDemoOverlay({
  phase,
}: {
  phase: PolishDemoPhase;
}) {
  if (phase === "hidden" || phase === "done") return null;

  const showText = phase === "recording";
  const isThinking = phase === "thinking";

  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      {/* Floating text bubble (above the pill) */}
      {showText && (
        <div
          className="overflow-hidden"
          style={{
            width: 280,
            padding: "8px 12px",
            borderRadius: 12,
            background: "radial-gradient(ellipse at 50% 0%, rgb(16,11,8) 0%, rgb(8,6,4) 100%)",
            border: "1px solid rgba(239,111,47,0.07)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5), 0 0 0.5px rgba(0,0,0,0.5), inset 0 1px 0 rgba(239,111,47,0.04)",
            animation: "sim-bubble-enter 250ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <StreamingWords text={DEMO_RAW} durationMs={9500} />
        </div>
      )}

      {/* Waveform pill — always visible during recording & thinking */}
      <div
        className="recording-pill relative flex items-center justify-center overflow-hidden active"
        style={{
          width: 70,
          height: 33,
          borderRadius: 999,
          padding: 6,
          clipPath: "inset(0 round 999px)",
        }}
      >
        {showText && <MiniWaveform />}
        {isThinking && <ThinkingDots />}
      </div>
    </div>
  );
}

/** Polished result text that fades in and scrolls into view. */
function PolishResult({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Find the nearest overflow-y-auto ancestor (the panel scroll container)
    // and scroll only that — not the page.
    const timer = setTimeout(() => {
      let scrollParent: HTMLElement | null = el.parentElement;
      while (scrollParent) {
        const ov = getComputedStyle(scrollParent).overflowY;
        if (ov === "auto" || ov === "scroll") break;
        scrollParent = scrollParent.parentElement;
      }
      if (scrollParent) {
        scrollParent.scrollTo({
          top: scrollParent.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-lg px-3 py-2 text-sm leading-snug whitespace-pre-line"
      style={{
        background: "rgba(var(--color-accent-rgb),0.04)",
        border: `1px solid rgba(var(--color-accent-rgb),0.12)`,
        color: ca.text(0.9),
        animation: "sim-fade-in 400ms ease-out",
      }}
    >
      {text}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Panel 1 — Polish
   ═══════════════════════════════════════════════════════════════════ */

function PolishPanel({
  show,
  highlightedPrompt,
  promptExpanded,
  showShortcuts,
  showFnBadge,
  showFnPress,
  demoPhase,
  showResult,
}: {
  show: boolean;
  highlightedPrompt: number | null;
  promptExpanded: boolean;
  showShortcuts: boolean;
  showFnBadge: boolean;
  showFnPress: boolean;
  demoPhase: PolishDemoPhase;
  showResult: boolean;
}) {
  const v = show ? " visible" : "";
  return (
    <div className="ps-10 pe-6 pt-4 pb-6 space-y-8">
      {/* API Configuration — collapsed summary */}
      <div className={`sim-item${v} space-y-2`} style={itemDelay(0)}>
        <div className="px-3">
          <h2
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: C.muted }}
          >
            API Configuration
          </h2>
        </div>
        <div
          className="rounded-xl overflow-visible"
          style={{
            border: `1px solid ${C.glassBorder}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.16), 0 0 1px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-center justify-between px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2 min-w-0">
              <div style={{ color: ca.muted(0.5) }}>
                <Icon d={ICONS.caretDown} size={12} />
              </div>
              <span className="text-sm truncate">
                <span className="font-semibold" style={{ color: ca.text(0.7) }}>
                  Anthropic
                </span>
                <span style={{ color: ca.muted(0.5) }}>
                  {" "}&middot; claude-sonnet-4-20250514
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Icon d={ICONS.check} size={14} style={{ color: "#4ade80" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Prompts */}
      <div className={`sim-item${v} space-y-2`} style={itemDelay(1)}>
        <div className="px-3 flex items-center justify-between">
          <h2
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: C.muted }}
          >
            Prompts
          </h2>
          <div className="p-1 rounded-lg" style={{ color: ca.muted(0.5) }}>
            <Icon d={ICONS.plus} size={14} />
          </div>
        </div>
        <div
          className="rounded-xl overflow-visible"
          style={{
            border: `1px solid ${C.glassBorder}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.16), 0 0 1px rgba(0,0,0,0.1)",
          }}
        >
          {PROMPTS.map((prompt, idx) => {
            const isLit = highlightedPrompt !== null && idx <= highlightedPrompt;
            const isExpanded = idx === 2 && promptExpanded;
            return (
              <div
                key={prompt.name}
                style={
                  idx > 0
                    ? { borderTop: `1px solid ${C.glassBorder}` }
                    : undefined
                }
              >
                {/* Header row */}
                <div data-cursor={`prompt-${idx}`} className="flex items-center justify-between px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`sim-caret${isExpanded ? " open" : ""}`}
                      style={{ color: ca.muted(0.5) }}
                    >
                      <Icon d={ICONS.caretDown} size={12} />
                    </div>
                    <span
                      className={`text-sm font-semibold truncate${isLit ? " sim-sweep-text" : ""}`}
                      style={isLit ? undefined : { color: ca.text(0.3) }}
                    >
                      {prompt.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Fn badge — pops in, then flashes on press */}
                    {idx === 2 && showFnBadge && (
                      <span
                        data-cursor="fn-badge"
                        className="text-[11px] px-1.5 py-0.5 rounded-md font-mono inline-block"
                        style={{
                          border: `1px solid ${showFnPress ? C.accent : ca.accent(0.25)}`,
                          background: showFnPress ? ca.accent(0.19) : "transparent",
                          color: C.accent,
                          animation: showFnPress
                            ? "sim-fn-press 500ms ease-out forwards"
                            : "sim-fn-pop 400ms cubic-bezier(0.34,1.56,0.64,1) forwards",
                        }}
                      >
                        fn
                      </span>
                    )}
                    {prompt.shortcut && showShortcuts && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-md tracking-wide inline-block"
                        style={{
                          border: `1px solid ${ca.accent(0.25)}`,
                          color: C.accent,
                          animation: "sim-fn-pop 400ms cubic-bezier(0.34,1.56,0.64,1) forwards",
                        }}
                      >
                        {prompt.shortcut}
                      </span>
                    )}
                    {prompt.builtin && (
                      <span
                        className="text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                        style={{
                          background: ca.muted(0.1),
                          color: ca.text(0.5),
                        }}
                      >
                        Built-in
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded prompt content — Aggressive prompt */}
                {idx === 2 && isExpanded && (
                  <div className="sim-expand open">
                    <div
                      className="px-3 pb-3 pt-1 space-y-3"
                      style={{ borderTop: `1px solid ${C.glassBorder}` }}
                    >
                      <div className="space-y-1">
                        <label
                          className="text-[11px] font-medium uppercase tracking-wider block"
                          style={{ color: ca.muted(0.5) }}
                        >
                          Instructions
                        </label>
                        <div
                          className="rounded-md px-3 py-2 text-xs leading-relaxed overflow-y-auto"
                          style={{
                            background: C.glassBg,
                            border: `1px solid ${C.glassBorder}`,
                            color: ca.text(0.5),
                            maxHeight: 80,
                          }}
                        >
                          You are a transcript-to-prose converter. Process the transcript into polished written prose. Fix spelling, capitalization, and punctuation. Remove filler words and stutters. Group sentences into paragraphs by rhetorical function. When the speaker lists parallel items, format them as a numbered list.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Polished result — inline in the panel */}
      {showResult && <PolishResult text={DEMO_POLISHED} />}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   Dock
   ═══════════════════════════════════════════════════════════════════ */

const DOCK_ITEMS = [
  { label: "Models", icon: ICONS.cube },
  { label: "Polish", icon: ICONS.pencilSimple },
];

function Dock({
  activePanel,
  onSelect,
  timerKey,
}: {
  activePanel: number;
  onSelect: (i: number) => void;
  timerKey: number;
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      {DOCK_ITEMS.map((item, i) => {
        const isActive = i === activePanel;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelect(i)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
              style={{
                background: isActive
                  ? "rgba(var(--color-accent-rgb),0.15)"
                  : C.glassBg,
                border: `1px solid ${isActive ? "rgba(var(--color-accent-rgb),0.3)" : C.glassBorder}`,
              }}
            >
              <Icon
                d={isActive ? item.icon.bold : item.icon.regular}
                size={20}
                style={{
                  color: isActive ? C.accent : C.muted,
                  transition: "color 200ms",
                }}
              />
            </div>
            <span
              className="text-[11px] transition-colors duration-200"
              style={{ color: isActive ? C.accent : C.muted }}
            >
              {item.label}
            </span>
            {/* Progress bar */}
            <div
              className="h-[2px] w-10 rounded-full overflow-hidden"
              style={{ background: ca.muted(0.12) }}
            >
              <div
                key={`${i}-${timerKey}`}
                className="h-full rounded-full"
                style={{
                  background: C.accent,
                  width: isActive ? undefined : "0%",
                  animation: isActive
                    ? `dock-fill ${PANEL_INTERVAL}ms linear forwards`
                    : "none",
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════════ */

export default function SimulatedApp() {
  const [activePanel, setActivePanel] = useState(0);
  const [staggerReady, setStaggerReady] = useState(false);
  const [modelExpanded, setModelExpanded] = useState(false);
  const [modelRealtimeSwept, setModelRealtimeSwept] = useState(false);
  const [modelRealtimeChecked, setModelRealtimeChecked] = useState(false);
  const [modelApiKeyChars, setModelApiKeyChars] = useState(0);
  const [modelNameChars, setModelNameChars] = useState(0);
  const [modelVerifyClicked, setModelVerifyClicked] = useState(false);
  const [modelGlossaryChars, setModelGlossaryChars] = useState(0);
  const [modelActivated, setModelActivated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  /* Polish demo state */
  const [highlightedPrompt, setHighlightedPrompt] = useState<number | null>(null);
  const [promptExpanded, setPromptExpanded] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showFnBadge, setShowFnBadge] = useState(false);
  const [showFnPress, setShowFnPress] = useState(false);
  const [demoPhase, setDemoPhase] = useState<PolishDemoPhase>("hidden");
  const [showResult, setShowResult] = useState(false);
  /* Cursor state */
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [cursorClicking, setCursorClicking] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const modelsScrollRef = useRef<HTMLDivElement>(null);
  const polishScrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const animFrameRef = useRef<number>(0);

  /** Resolve cursor position from a data-cursor target element */
  const cursorTo = useCallback((name: string): { x: number; y: number } | null => {
    const surface = surfaceRef.current;
    if (!surface) return null;
    const el = surface.querySelector(`[data-cursor="${name}"]`);
    if (!el) return null;
    const sr = surface.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    // Account for the 0.85 scale: rendered positions are scaled, convert back to native coords
    const scale = 0.85;
    return {
      x: (er.left + er.width / 2 - sr.left) / scale,
      y: (er.top + er.height / 2 - sr.top) / scale,
    };
  }, []);

  /* ── Clean up within-panel timers ── */
  const clearPanelTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    cancelAnimationFrame(animFrameRef.current);
  }, []);

  /* ── Advance to next panel ── */
  const advancePanel = useCallback(() => {
    setActivePanel((prev) => {
      const next = (prev + 1) % PANEL_COUNT;
      return next;
    });
    setTimerKey((k) => k + 1);
  }, []);

  /* ── Go to specific panel (dock click) ── */
  const goToPanel = useCallback(
    (index: number) => {
      setActivePanel(index);
      setTimerKey((k) => k + 1);
      // Reset auto-advance
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(advancePanel, PANEL_INTERVAL);
    },
    [advancePanel],
  );

  /* ── Start within-panel animations ── */
  const startPanelAnimations = useCallback(
    (panel: number) => {
      clearPanelTimers();
      setStaggerReady(false);
      setModelExpanded(false);
      setModelRealtimeSwept(false);
      setModelRealtimeChecked(false);
      setModelApiKeyChars(0);
      setModelNameChars(0);
      setModelVerifyClicked(false);
      setModelGlossaryChars(0);
      // Keep OpenAI active on Polish panel; reset only on Models
      if (panel === 0) setModelActivated(false);
      setHighlightedPrompt(null);
      setPromptExpanded(false);
      setShowShortcuts(false);
      setShowFnBadge(false);
      setShowFnPress(false);
      setDemoPhase("hidden");
      setShowResult(false);
      setCursorPos(null);
      setCursorClicking(false);
      // Reset scroll positions
      if (modelsScrollRef.current) modelsScrollRef.current.scrollTop = 0;
      if (polishScrollRef.current) polishScrollRef.current.scrollTop = 0;

      // Stagger in after a frame
      timersRef.current.push(
        setTimeout(() => setStaggerReady(true), 50),
      );

      // Cursor helpers (shared by both panels)
      const moveTo = (target: string, t: number) => {
        timersRef.current.push(
          setTimeout(() => { const p = cursorTo(target); if (p) setCursorPos(p); }, t),
        );
      };
      const clickOn = (target: string, t: number) => {
        timersRef.current.push(
          setTimeout(() => { const p = cursorTo(target); if (p) setCursorPos(p); }, t - 400),
          setTimeout(() => setCursorClicking(true), t),
          setTimeout(() => setCursorClicking(false), t + 150),
        );
      };

      if (panel === 0) {
        // Models: progressive guided demo with cursor
        // 0.8s cursor appears on card header, 1.2s click → expand
        moveTo("card-header", 800);
        clickOn("card-header", 1200);
        timersRef.current.push(
          setTimeout(() => setModelExpanded(true), 1500),
        );
        // 2.6s move to API key field, 3.0s start typing
        moveTo("api-key", 2600);
        for (let i = 1; i <= 24; i++) {
          timersRef.current.push(
            setTimeout(() => setModelApiKeyChars(i), 3000 + i * 80),
          );
        }
        // 5.1s move to model name field, 5.5s start typing
        moveTo("model-name", 5100);
        for (let i = 1; i <= MODEL_NAME_DEMO.length; i++) {
          timersRef.current.push(
            setTimeout(() => setModelNameChars(i), 5500 + i * 70),
          );
        }
        // 7.1s move to realtime, 7.5s click → sweep + check
        clickOn("realtime", 7500);
        timersRef.current.push(
          setTimeout(() => setModelRealtimeSwept(true), 7500),
          setTimeout(() => setModelRealtimeChecked(true), 8500),
        );
        // 9.1s move to Verify, 9.5s click
        clickOn("verify", 9500);
        timersRef.current.push(
          setTimeout(() => setModelVerifyClicked(true), 9500),
        );
        // 10.1s move to glossary, 10.5s start typing
        moveTo("glossary", 10100);
        for (let i = 1; i <= GLOSSARY_DEMO.length; i++) {
          timersRef.current.push(
            setTimeout(() => setModelGlossaryChars(i), 10500 + i * 90),
          );
        }
        // 12.6s move to card header, 13.0s click → collapse
        clickOn("card-header", 13000);
        timersRef.current.push(
          setTimeout(() => setModelExpanded(false), 13000),
        );
        // 13.4s click again → activate OpenAI
        clickOn("card-header", 13800);
        timersRef.current.push(
          setTimeout(() => setModelActivated(true), 13800),
        );
        // 14.2s hide cursor, scroll
        timersRef.current.push(
          setTimeout(() => setCursorPos(null), 14200),
        );
        // 14.5s → smooth scroll to bottom (~2s)
        timersRef.current.push(
          setTimeout(() => {
            const el = modelsScrollRef.current;
            if (!el) return;
            const start = el.scrollTop;
            const target = el.scrollHeight - el.clientHeight;
            if (target <= 0) return;
            const duration = 2000;
            const t0 = performance.now();
            const animate = (now: number) => {
              const elapsed = now - t0;
              const p = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.scrollTop = start + (target - start) * eased;
              if (p < 1) animFrameRef.current = requestAnimationFrame(animate);
            };
            animFrameRef.current = requestAnimationFrame(animate);
          }, 14500),
        );
        // Advance to Polish panel after scroll + 1s dwell
        timersRef.current.push(
          setTimeout(() => goToPanel(1), 17500),
        );
      }
      if (panel === 1) {
        // Polish: progressive guided demo
        // Cursor hovers over prompts as they sweep
        moveTo("prompt-0", 400);
        timersRef.current.push(
          setTimeout(() => setHighlightedPrompt(0), 800),
        );
        moveTo("prompt-1", 1400);
        timersRef.current.push(
          setTimeout(() => setHighlightedPrompt(1), 1800),
        );
        moveTo("prompt-2", 2400);
        timersRef.current.push(
          setTimeout(() => setHighlightedPrompt(2), 2800),
        );
        // Click Aggressive to expand
        clickOn("prompt-2", 3800);
        timersRef.current.push(
          setTimeout(() => setPromptExpanded(true), 4000),
          setTimeout(() => setShowShortcuts(true), 5000),
          setTimeout(() => setShowFnBadge(true), 5800),
        );
        // Cursor moves to fn badge, press
        moveTo("fn-badge", 5900);
        clickOn("fn-badge", 6200);
        timersRef.current.push(
          setTimeout(() => setShowFnPress(true), 6200),
          // Hide cursor during recording overlay
          setTimeout(() => setCursorPos(null), 6800),
          setTimeout(() => setDemoPhase("recording"), 6800),
          setTimeout(() => setDemoPhase("thinking"), 16300),
          setTimeout(() => {
            setDemoPhase("done");
            setShowResult(true);
          }, 18300),
          // Smooth scroll to reveal the result box
          setTimeout(() => {
            const el = polishScrollRef.current;
            if (!el) return;
            const start = el.scrollTop;
            const target = el.scrollHeight - el.clientHeight;
            if (target <= 0) return;
            const duration = 1500;
            const t0 = performance.now();
            const animate = (now: number) => {
              const elapsed = now - t0;
              const p = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.scrollTop = start + (target - start) * eased;
              if (p < 1) animFrameRef.current = requestAnimationFrame(animate);
            };
            animFrameRef.current = requestAnimationFrame(animate);
          }, 18500),
        );
      }
    },
    [clearPanelTimers, goToPanel, cursorTo],
  );

  /* ── Trigger panel animations when activePanel changes ── */
  useEffect(() => {
    startPanelAnimations(activePanel);
  }, [activePanel, startPanelAnimations]);

  /* ── IntersectionObserver ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Auto-advance timer, gated by visibility ── */
  useEffect(() => {
    if (!isVisible) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(advancePanel, PANEL_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [isVisible, advancePanel]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearPanelTimers();
    };
  }, [clearPanelTimers]);

  const activeTabId = PANEL_TAB_IDS[activePanel];

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[1060px] mx-auto flex flex-col items-center gap-4"
    >
      {/* ── Chromeless floating surface ── */}
      <div
        ref={surfaceRef}
        className="sim-app-typo w-full rounded-2xl relative origin-top"
        style={{
          border: `1px solid ${C.glassBorder}`,
          boxShadow:
            `0 12px 48px rgba(0,0,0,0.25), 0 0 0 0.5px ${C.glassBorder}`,
          color: C.text,
          transform: "scale(0.85)",
          marginBottom: "-7.5%",
        }}
      >
        {/* Clipped content area */}
        <div className="rounded-2xl overflow-hidden">
          <div className="flex" style={{ background: C.bg, height: 612 }}>
            <Sidebar activeTabId={activeTabId} />
            <div className="flex-1 overflow-hidden">
              <div
                className="flex h-full"
                style={{
                  transform: `translateX(-${activePanel * (100 / PANEL_COUNT)}%)`,
                  transition: `transform 300ms ${EASE}`,
                  width: `${PANEL_COUNT * 100}%`,
                }}
              >
                <div ref={modelsScrollRef} className="flex-1 min-w-0 overflow-y-hidden">
                  <ModelsPanel
                    show={staggerReady && activePanel === 0}
                    modelExpanded={modelExpanded}
                    realtimeSwept={modelRealtimeSwept}
                    realtimeChecked={modelRealtimeChecked}
                    apiKeyChars={modelApiKeyChars}
                    modelNameChars={modelNameChars}
                    verifyClicked={modelVerifyClicked}
                    glossaryChars={modelGlossaryChars}
                    modelActivated={modelActivated}
                  />
                </div>
                <div ref={polishScrollRef} className="flex-1 min-w-0 overflow-y-hidden">
                  <PolishPanel
                    show={staggerReady && activePanel === 1}
                    highlightedPrompt={highlightedPrompt}
                    promptExpanded={promptExpanded}
                    showShortcuts={showShortcuts}
                    showFnBadge={showFnBadge}
                    showFnPress={showFnPress}
                    demoPhase={demoPhase}
                    showResult={showResult}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="w-full pt-2"
            style={{
              borderTop: `1px solid ${C.glassBorder}`,
              background: C.glassBg,
            }}
          >
            <div
              className="flex justify-between items-center text-xs px-4 pb-2"
              style={{ color: ca.text(0.7) }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                <span className="max-w-28 truncate">{modelActivated ? "OpenAI" : "Parakeet V2"}</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: ca.muted(0.6) }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Floating recording overlay — floats on top of the surface */}
        {demoPhase !== "hidden" && demoPhase !== "done" && (
          <div
            className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none z-10"
            style={{ paddingBottom: 52 }}
          >
            <PolishDemoOverlay phase={demoPhase} />
          </div>
        )}

        {/* Simulated cursor */}
        {cursorPos && (
          <div
            className="absolute pointer-events-none z-30"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transition: "left 400ms cubic-bezier(0.16,1,0.3,1), top 400ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}
            >
              <path d="M5 3l14 9.5L12 14l-3 7L5 3z" fill="white" stroke="black" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            {cursorClicking && (
              <span className="sim-cursor-click" />
            )}
          </div>
        )}
      </div>

      {/* ── Dock ── */}
      <Dock
        activePanel={activePanel}
        onSelect={goToPanel}
        timerKey={timerKey}
      />
    </div>
  );
}
