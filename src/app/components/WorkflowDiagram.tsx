"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const ENGINES = [
  { id: "whisper", name: "Whisper", tag: "local" as const },
  { id: "parakeet", name: "Parakeet", tag: "local" as const },
  { id: "moonshine", name: "Moonshine", tag: "local" as const },
  { id: "sensevoice", name: "SenseVoice", tag: "local" as const },
  { id: "breeze", name: "Breeze ASR", tag: "local" as const },
  { id: "openai-stt", name: "OpenAI", tag: "cloud" as const },
  { id: "cartesia", name: "Cartesia", tag: "cloud" as const },
  { id: "elevenlabs", name: "ElevenLabs", tag: "cloud" as const },
  { id: "groq-stt", name: "Groq", tag: "cloud" as const },
  { id: "mistral", name: "Mistral AI", tag: "cloud" as const },
  { id: "soniox", name: "Soniox", tag: "cloud" as const },
  { id: "deepgram", name: "Deepgram", tag: "cloud" as const },
  { id: "assemblyai", name: "AssemblyAI", tag: "cloud" as const },
  { id: "fireworks", name: "Fireworks AI", tag: "cloud" as const },
];

const LLMS = [
  { id: "openai", name: "OpenAI" },
  { id: "anthropic", name: "Anthropic" },
  { id: "gemini", name: "Gemini" },
  { id: "groq", name: "Groq" },
  { id: "zai", name: "Z.AI" },
  { id: "openrouter", name: "OpenRouter" },
  { id: "cerebras", name: "Cerebras" },
  { id: "apple", name: "Apple Intelligence" },
  { id: "custom", name: "Custom" },
];

const PROMPTS = [
  { id: "mild", name: "Mild", desc: "Fix filler words & punctuation" },
  { id: "medium", name: "Medium", desc: "Clean grammar, structure & flow" },
  { id: "aggressive", name: "Aggressive", desc: "Full rewrite for clarity" },
];

const ALL_PROMPTS = [
  ...PROMPTS,
  { id: "custom", name: "Custom", desc: "Write your own" },
];

/* ─── Provider brand icons ─── */

const PI: Record<string, { vb?: string; d: string[] }> = {
  openai: {
    d: [
      "M22.282 9.821a6 6 0 0 0-.516-4.91 6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a6 6 0 0 0-3.998 2.9 6.05 6.05 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.05 6.05 0 0 0 6.515 2.9A6 6 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206 6 6 0 0 0 3.997-2.9 6.06 6.06 0 0 0-.747-7.073M13.26 22.43a4.48 4.48 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.8.8 0 0 0 .392-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.5 4.5 0 0 1 2.366-1.973V11.6a.77.77 0 0 0 .388.677l5.815 3.354-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667m2.01-3.023-.141-.085-4.774-2.782a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.8.8 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z",
    ],
  },
  nvidia: {
    d: [
      "M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z",
    ],
  },
  deepgram: {
    d: [
      "M11.203 24H1.517a.364.364 0 0 1-.258-.62l6.239-6.275a.366.366 0 0 1 .259-.108h3.52c2.723 0 5.025-2.127 5.107-4.845a5.004 5.004 0 0 0-4.999-5.148H7.613v4.646c0 .2-.164.364-.365.364H.968a.365.365 0 0 1-.363-.364V.364C.605.164.768 0 .969 0h10.416c6.684 0 12.111 5.485 12.01 12.187C23.293 18.77 17.794 24 11.202 24z",
    ],
  },
  assemblyai: {
    d: [
      "M10.595 1.5a3.695 3.695 0 00-3.444 2.355L0 22.26h5.432l5.629-14.486h.002a.96.96 0 011.782 0h.75V4.835h-1.393L13.498 1.5h-2.902z",
      "M7.151 3.855a3.695 3.695 0 013.26-2.35l-.002-.005H13.405c1.524 0 2.893.936 3.444 2.355L24 22.26h-5.525L11.54 4.413a2.528 2.528 0 00-4.609.006l.22-.564z",
    ],
  },
  elevenlabs: {
    d: ["M4.6035 0v24h4.9317V0zm9.8613 0v24h4.9317V0z"],
  },
  groq: {
    d: [
      "M12.036 2c-3.853-.035-7 3-7.036 6.781-.035 3.782 3.055 6.872 6.908 6.907h2.42v-2.566h-2.292c-2.407.028-4.38-1.866-4.408-4.23-.029-2.362 1.901-4.298 4.308-4.326h.1c2.407 0 4.358 1.915 4.365 4.278v6.305c0 2.342-1.944 4.25-4.323 4.279a4.375 4.375 0 01-3.033-1.252l-1.851 1.818A7 7 0 0012.029 22h.092c3.803-.056 6.858-3.083 6.879-6.816v-6.5C18.907 4.963 15.817 2 12.036 2z",
    ],
  },
  mistral: {
    d: [
      "M17.143 3.429v3.428h-3.429v3.429h-3.428V6.857H6.857V3.43H3.43v13.714H0v3.428h10.286v-3.428H6.857v-3.429h3.429v3.429h3.429v-3.429h3.428v3.429h-3.428v3.428H24v-3.428h-3.43V3.429z",
    ],
  },
  anthropic: {
    d: [
      "M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z",
    ],
  },
  gemini: {
    d: [
      "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81",
    ],
  },
  apple: {
    d: [
      "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
    ],
  },
  openrouter: {
    d: [
      "M16.778 1.844v1.919q-.569-.026-1.138-.032-.708-.008-1.415.037c-1.93.126-4.023.728-6.149 2.237-2.911 2.066-2.731 1.95-4.14 2.75-.396.223-1.342.574-2.185.798-.841.225-1.753.333-1.751.333v4.229s.768.108 1.61.333c.842.224 1.789.575 2.185.799 1.41.798 1.228.683 4.14 2.75 2.126 1.509 4.22 2.11 6.148 2.236.88.058 1.716.041 2.555.005v1.918l7.222-4.168-7.222-4.17v2.176c-.86.038-1.611.065-2.278.021-1.364-.09-2.417-.357-3.979-1.465-2.244-1.593-2.866-2.027-3.68-2.508.889-.518 1.449-.906 3.822-2.59 1.56-1.109 2.614-1.377 3.978-1.466.667-.044 1.418-.017 2.278.02v2.176L24 6.014Z",
    ],
  },
  cartesia: {
    vb: "0 0 19 19",
    d: [
      "M6 1h3v3H6zM12 1h3v3h-3zM3 4h3v3H3zM9 4h3v3H9zM15 4h3v3h-3zM0 7h3v3H0zM6 7h3v3H6zM0 10h3v3H0zM6 10h3v3H6zM3 13h3v3H3zM9 13h3v3H9zM15 13h3v3h-3zM6 16h3v3H6zM12 16h3v3h-3z",
    ],
  },
  fireworks: {
    d: [
      "M14.8 5l-2.801 6.795L9.195 5H7.397l3.072 7.428a1.64 1.64 0 003.038.002L16.598 5H14.8zm1.196 10.352l5.124-5.244-.699-1.669-5.596 5.739a1.664 1.664 0 00-.343 1.807 1.642 1.642 0 001.516 1.012L16 17l8-.02-.699-1.669-7.303.041h-.002zM2.88 10.104l.699-1.669 5.596 5.739c.468.479.603 1.189.343 1.807a1.643 1.643 0 01-1.516 1.012l-8-.018-.002.002.699-1.669 7.303.042-5.122-5.246z",
    ],
  },
  cerebras: {
    d: [
      "M14.121 2.701a9.299 9.299 0 000 18.598V22.7c-5.91 0-10.7-4.791-10.7-10.701S8.21 1.299 14.12 1.299V2.7zm4.752 3.677A7.353 7.353 0 109.42 17.643l-.901 1.074a8.754 8.754 0 01-1.08-12.334 8.755 8.755 0 0112.335-1.08l-.901 1.075zm-2.255.844a5.407 5.407 0 00-5.048 9.563l-.656 1.24a6.81 6.81 0 016.358-12.043l-.654 1.24zM14.12 8.539a3.46 3.46 0 100 6.922v1.402a4.863 4.863 0 010-9.726v1.402z",
      "M15.407 10.836a2.24 2.24 0 00-.51-.409 1.084 1.084 0 00-.544-.152c-.255 0-.483.047-.684.14a1.58 1.58 0 00-.84.912c-.074.203-.11.416-.11.631 0 .218.036.43.11.631a1.594 1.594 0 00.84.913c.2.093.43.14.684.14.216 0 .417-.046.602-.135.188-.09.35-.225.475-.392l.928 1.006c-.14.14-.3.261-.482.363a3.367 3.367 0 01-1.083.38c-.17.026-.317.04-.44.04a3.315 3.315 0 01-1.182-.21 2.825 2.825 0 01-.961-.597 2.816 2.816 0 01-.644-.929 2.987 2.987 0 01-.238-1.21c0-.444.08-.847.238-1.21.15-.35.368-.666.643-.929.278-.261.605-.464.962-.596a3.315 3.315 0 011.182-.21c.355 0 .712.068 1.072.204.361.138.685.36.944.649l-.962.97z",
    ],
  },
  xai: {
    vb: "0 0 512 512",
    d: [
      "M210.484 312.759L343.465 210.383C349.984 205.364 359.302 207.322 362.408 215.117C378.758 256.231 371.454 305.64 338.925 339.563C306.397 373.487 261.137 380.927 219.768 363.983L174.577 385.803C239.394 432.008 318.104 420.581 367.289 369.251C406.303 328.564 418.386 273.104 407.088 223.091L407.19 223.198C390.807 149.726 411.218 120.359 453.03 60.3072C454.02 58.8833 455.01 57.4595 456 56L400.978 113.382V113.204L210.45 312.794",
      "M183.042 337.641C136.519 291.294 144.54 219.567 184.236 178.203C213.59 147.59 261.683 135.096 303.666 153.464L348.755 131.75C340.632 125.627 330.221 119.042 318.275 114.414C264.277 91.2407 199.63 102.774 155.735 148.516C113.513 192.549 100.236 260.254 123.036 318.027C140.069 361.206 112.148 391.748 84.0229 422.575C74.0561 433.503 64.0553 444.431 56 456L183.007 337.677",
    ],
  },
  _dot: {
    d: ["M12 6a6 6 0 100 12 6 6 0 000-12z"],
  },
};

const ICON_KEY: Record<string, string> = {
  whisper: "openai",
  parakeet: "nvidia",
  "openai-stt": "openai",
  "groq-stt": "groq",
  zai: "xai",
  moonshine: "_dot",
  sensevoice: "_dot",
  soniox: "_dot",
  breeze: "_dot",
};

function ProviderIcon({ id, size = 14 }: { id: string; size?: number }) {
  const key = ICON_KEY[id] ?? id;
  const icon = PI[key];
  if (!icon) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.vb ?? "0 0 24 24"}
      fill="currentColor"
      className="shrink-0 opacity-70"
    >
      {icon.d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

function WaveBars({ fast = false, count = 4 }: { fast?: boolean; count?: number }) {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="w-[2.5px] rounded-full bg-accent/50 origin-bottom"
          style={{
            height: 14,
            animation: `wf-wave ${fast ? "0.6s" : "1.8s"} ease-in-out ${i * (fast ? 0.1 : 0.25)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function MobileArrow() {
  return (
    <div className="flex justify-center py-1 text-muted/30">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

export default function WorkflowDiagram() {
  const [engine, setEngine] = useState("openai-stt");
  const [llm, setLlm] = useState("anthropic");
  const [prompt, setPrompt] = useState("aggressive");
  const [recording, setRecording] = useState(false);

  // Auto-stop recording after 3 seconds
  useEffect(() => {
    if (!recording) return;
    const t = setTimeout(() => setRecording(false), 3000);
    return () => clearTimeout(t);
  }, [recording]);

  /* ── Bezier flow lines (desktop) ── */
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeMap = useRef(new Map<string, HTMLElement>());
  const [lines, setLines] = useState<{ key: string; d: string }[]>([]);
  const [polishLines, setPolishLines] = useState<
    { id: string; x: number; y1: number; y2: number; active: boolean }[]
  >([]);

  const nodeRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) nodeMap.current.set(id, el);
      else nodeMap.current.delete(id);
    },
    []
  );

  useEffect(() => {
    const recalc = () => {
      const ctr = containerRef.current;
      if (!ctr) return;
      const cr = ctr.getBoundingClientRect();

      const bezier = (fromId: string, toId: string, key: string) => {
        const a = nodeMap.current.get(fromId);
        const b = nodeMap.current.get(toId);
        if (!a || !b) return null;
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        // Connect bottom-center of source → top-center of target
        const x1 = ar.left - cr.left + ar.width / 2;
        const y1 = ar.bottom - cr.top;
        const x2 = br.left - cr.left + br.width / 2;
        const y2 = br.top - cr.top;
        const cp = (y2 - y1) * 0.45;
        return {
          key,
          d: `M${x1},${y1} C${x1},${y1 + cp} ${x2},${y2 - cp} ${x2},${y2}`,
        };
      };

      setLines(
        [
          bezier("input", `e-${engine}`, "a"),
          bezier(`e-${engine}`, `l-${llm}`, "b"),
          bezier(`l-${llm}`, `p-${prompt}`, "c"),
        ].filter(Boolean) as { key: string; d: string }[]
      );

      // Vertical lines from each polish card down to the output bar
      const bar = nodeMap.current.get("output-bar");
      if (bar) {
        const barR = bar.getBoundingClientRect();
        const barY = barR.top - cr.top;
        setPolishLines(
          ALL_PROMPTS.map((p) => {
            const el = nodeMap.current.get(`p-${p.id}`);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
              id: p.id,
              x: r.left - cr.left + r.width / 2,
              y1: r.bottom - cr.top,
              y2: barY,
              active: p.id === prompt,
            };
          }).filter(Boolean) as {
            id: string;
            x: number;
            y1: number;
            y2: number;
            active: boolean;
          }[]
        );
      }
    };

    requestAnimationFrame(recalc);
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [engine, llm, prompt]);

  const selectedEngine = ENGINES.find((e) => e.id === engine);
  const selectedLlm = LLMS.find((l) => l.id === llm);
  const selectedPrompt = ALL_PROMPTS.find((p) => p.id === prompt);

  const chipCls = (active: boolean) =>
    [
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] leading-tight transition-all duration-200",
      active
        ? "bg-[rgba(212,98,42,0.1)] border border-[rgba(212,98,42,0.3)] text-accent font-medium shadow-[0_0_12px_rgba(212,98,42,0.06)]"
        : "border border-transparent text-muted/60 hover:text-text hover:bg-[rgba(200,170,140,0.06)]",
    ].join(" ");

  const polishCls = (active: boolean) =>
    [
      "flex-1 text-center px-2 py-2.5 rounded-lg text-[11px] transition-all duration-200",
      active
        ? "bg-[rgba(212,98,42,0.1)] border border-[rgba(212,98,42,0.3)] text-accent font-medium shadow-[0_0_12px_rgba(212,98,42,0.06)]"
        : "border border-transparent text-muted/60 hover:text-text hover:bg-[rgba(200,170,140,0.06)]",
    ].join(" ");

  const mobileChipCls = (active: boolean) =>
    [
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200",
      active
        ? "bg-[rgba(212,98,42,0.1)] border border-[rgba(212,98,42,0.35)] text-accent font-medium"
        : "border border-transparent text-muted",
    ].join(" ");

  const mobilePromptCls = (active: boolean) =>
    [
      "w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-200",
      active
        ? "bg-[rgba(212,98,42,0.1)] border border-[rgba(212,98,42,0.35)] text-accent font-medium"
        : "border border-transparent text-muted",
    ].join(" ");

  return (
    <div ref={containerRef} className="relative">
      {/* ── Desktop ── */}
      <div className="hidden lg:flex flex-col gap-5">
        {/* Bezier flow SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
          fill="none"
        >
          <defs>
            <filter id="wf-glow">
              <feGaussianBlur stdDeviation="3" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {lines.map((l) => (
            <g key={l.key}>
              <path
                d={l.d}
                stroke="rgba(212,98,42,0.25)"
                strokeWidth="1.5"
                filter="url(#wf-glow)"
              />
              <circle r="2.5" fill="rgba(212,98,42,0.55)">
                <animateMotion
                  dur={recording ? "1.5s" : "2.5s"}
                  repeatCount="indefinite"
                  path={l.d}
                />
              </circle>
            </g>
          ))}
          {/* Vertical lines from each polish card to the output bar */}
          {polishLines.map((pl) => (
            <g key={`pl-${pl.id}`}>
              {/* Glow layer for active line */}
              {pl.active && (
                <line
                  x1={pl.x}
                  y1={pl.y1}
                  x2={pl.x}
                  y2={pl.y2}
                  stroke="rgba(212,98,42,0.3)"
                  strokeWidth="6"
                  filter="url(#wf-glow)"
                />
              )}
              {/* Crisp line on top */}
              <line
                x1={pl.x}
                y1={pl.y1}
                x2={pl.x}
                y2={pl.y2}
                stroke={
                  pl.active
                    ? "rgba(212,98,42,0.7)"
                    : "rgba(212,98,42,0.08)"
                }
                strokeWidth={pl.active ? 2 : 1}
              />
              {pl.active && (
                <circle r="2.5" fill="rgba(212,98,42,0.55)">
                  <animateMotion
                    dur={recording ? "0.6s" : "1s"}
                    repeatCount="indefinite"
                    path={`M${pl.x},${pl.y1} L${pl.x},${pl.y2}`}
                  />
                </circle>
              )}
            </g>
          ))}
        </svg>

        {/* Voice input */}
        <button
          ref={nodeRef("input")}
          onClick={() => setRecording((r) => !r)}
          className="group flex items-center gap-3 text-left w-fit relative"
          style={{ zIndex: 2 }}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-accent/20 bg-accent/5 transition-all duration-200 group-hover:border-accent/40 group-hover:bg-accent/10 shrink-0">
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
            {recording && (
              <span
                className="absolute inset-0 rounded-full border border-accent/30"
                style={{ animation: "wf-pulse 1.5s ease-out infinite" }}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <WaveBars fast={recording} />
            <span className="text-xs font-medium text-text group-hover:text-accent transition-colors duration-200">
              Your voice
            </span>
          </div>
        </button>

        {/* STT Engine */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="text-[10px] font-medium text-muted/50 uppercase tracking-wider mb-1.5 pl-0.5">
            STT Engine
          </p>
          <div className="flex flex-wrap gap-1">
            {ENGINES.map((e) => (
              <button
                key={e.id}
                ref={nodeRef(`e-${e.id}`)}
                onClick={() => setEngine(e.id)}
                className={chipCls(engine === e.id)}
              >
                <ProviderIcon id={e.id} size={11} />
                {e.name}
              </button>
            ))}
          </div>
        </div>

        {/* LLM Provider */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="text-[10px] font-medium text-muted/50 uppercase tracking-wider mb-1.5 pl-0.5">
            LLM Provider
          </p>
          <div className="flex flex-wrap gap-1">
            {LLMS.map((l) => (
              <button
                key={l.id}
                ref={nodeRef(`l-${l.id}`)}
                onClick={() => setLlm(l.id)}
                className={chipCls(llm === l.id)}
              >
                <ProviderIcon id={l.id} size={11} />
                {l.name}
              </button>
            ))}
          </div>
        </div>

        {/* Polish Level + Output bar */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="text-[10px] font-medium text-muted/50 uppercase tracking-wider mb-1.5 pl-0.5">
            Polish Level
          </p>
          <div className="flex gap-1.5">
            {ALL_PROMPTS.map((p) => (
              <button
                key={p.id}
                ref={nodeRef(`p-${p.id}`)}
                onClick={() => setPrompt(p.id)}
                className={polishCls(prompt === p.id)}
              >
                <span className="block">{p.name}</span>
                <span
                  className={`block text-[9px] mt-0.5 transition-colors duration-200 ${
                    prompt === p.id ? "text-muted/60" : "text-muted/30"
                  }`}
                >
                  {p.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Spacer for vertical connector lines */}
          <div className="h-8" />

          {/* Output bar */}
          <div
            ref={nodeRef("output-bar")}
            className="h-[2px] rounded-full bg-text/15"
          />
          <p className="text-[10px] text-muted/40 mt-2 text-center">
            {selectedEngine?.name} → {selectedLlm?.name} → {selectedPrompt?.name} → <span className="text-text/70 font-medium">Polished text</span>
            <span
              className="inline-block w-[1.5px] h-3 bg-accent/40 ml-0.5 align-middle"
              style={{ animation: "wf-blink 1s step-end infinite" }}
            />
          </p>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden space-y-2">
        {/* Voice input */}
        <div className="flex items-center gap-3 px-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-accent/20 bg-accent/5 shrink-0">
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <WaveBars />
            <span className="text-sm text-muted">Your voice</span>
          </div>
        </div>

        <MobileArrow />

        {/* STT Engines */}
        <div>
          <p className="text-xs font-semibold text-text mb-2 pl-1">
            STT Providers
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ENGINES.map((e) => (
              <button
                key={e.id}
                onClick={() => setEngine(e.id)}
                className={mobileChipCls(engine === e.id)}
              >
                <ProviderIcon id={e.id} size={14} />
                {e.name}
              </button>
            ))}
          </div>
        </div>

        <MobileArrow />

        {/* LLM Providers */}
        <div>
          <p className="text-xs font-semibold text-text mb-2 pl-1">
            LLM Providers
          </p>
          <div className="flex flex-wrap gap-1.5">
            {LLMS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLlm(l.id)}
                className={mobileChipCls(llm === l.id)}
              >
                <ProviderIcon id={l.id} size={14} />
                {l.name}
              </button>
            ))}
          </div>
        </div>

        <MobileArrow />

        {/* Polish Prompt */}
        <div>
          <p className="text-xs font-semibold text-text mb-2 pl-1">
            Polish Prompt
          </p>
          <div className="space-y-1.5">
            {PROMPTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPrompt(p.id)}
                className={mobilePromptCls(prompt === p.id)}
              >
                <span>{p.name}</span>
                <span
                  className={`block text-[11px] mt-0.5 ${
                    prompt === p.id ? "text-muted/70" : "text-muted/50"
                  }`}
                >
                  {p.desc}
                </span>
              </button>
            ))}
            <div className="border-t border-border my-1" />
            <button
              onClick={() => setPrompt("custom")}
              className={mobilePromptCls(prompt === "custom")}
            >
              <span>Custom</span>
              <span
                className={`block text-[11px] mt-0.5 ${
                  prompt === "custom" ? "text-muted/70" : "text-muted/50"
                }`}
              >
                Write your own prompt
              </span>
            </button>
          </div>
        </div>

        <MobileArrow />

        {/* Text output */}
        <div className="flex items-center gap-3 px-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-accent/20 bg-accent/5 shrink-0">
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
            </svg>
          </div>
          <div>
            <span className="text-sm text-muted">Polished text</span>
            <span className="flex items-center text-[10px] text-muted/50">
              <span
                className="inline-block w-[1.5px] h-3 bg-accent/40 ml-0.5"
                style={{ animation: "wf-blink 1s step-end infinite" }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
