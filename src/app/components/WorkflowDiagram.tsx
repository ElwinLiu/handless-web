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

export default function WorkflowDiagram() {
  const [engine, setEngine] = useState("openai-stt");
  const [llm, setLlm] = useState("openrouter");
  const [prompt, setPrompt] = useState("aggressive");

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeMap = useRef(new Map<string, HTMLElement>());
  const [lines, setLines] = useState<{ key: string; d: string }[]>([]);

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
        const x1 = ar.right - cr.left;
        const y1 = ar.top - cr.top + ar.height / 2;
        const x2 = br.left - cr.left;
        const y2 = br.top - cr.top + br.height / 2;
        const cp = (x2 - x1) * 0.45;
        return {
          key,
          d: `M${x1},${y1} C${x1 + cp},${y1} ${x2 - cp},${y2} ${x2},${y2}`,
        };
      };

      setLines(
        [
          bezier("input", `e-${engine}`, "a"),
          bezier(`e-${engine}`, `l-${llm}`, "b"),
          bezier(`l-${llm}`, `p-${prompt}`, "c"),
          bezier(`p-${prompt}`, "output", "d"),
        ].filter(Boolean) as { key: string; d: string }[]
      );
    };

    requestAnimationFrame(recalc);
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [engine, llm, prompt]);

  const itemCls = (active: boolean, withDesc = false) =>
    [
      "w-full text-left rounded-lg text-[13px] transition-all duration-200",
      withDesc ? "px-3 py-2" : "px-3 py-1.5",
      active
        ? "bg-[rgba(212,98,42,0.1)] border border-[rgba(212,98,42,0.35)] shadow-[0_0_16px_rgba(212,98,42,0.06)]"
        : "border border-transparent hover:bg-[rgba(200,170,140,0.06)]",
    ].join(" ");

  const nameCls = (active: boolean) =>
    active
      ? "text-accent font-medium transition-colors duration-200"
      : "text-muted hover:text-text transition-colors duration-200";

  const MicIcon = ({ size = 22 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
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
  );

  const DocIcon = ({ size = 22 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
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
  );

  const Arrow = () => (
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

  return (
    <div ref={containerRef} className="relative">
      {/* ── Desktop ── */}
      <div className="hidden lg:block">
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
            <g key={l.d}>
              <path
                d={l.d}
                stroke="rgba(212,98,42,0.25)"
                strokeWidth="1.5"
                filter="url(#wf-glow)"
              />
              <circle r="2" fill="rgba(212,98,42,0.55)">
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  path={l.d}
                />
              </circle>
            </g>
          ))}
        </svg>

        <div
          className="flex items-start gap-6 justify-center"
          style={{ position: "relative", zIndex: 2 }}
        >
          {/* Voice input */}
          <div className="flex flex-col items-center gap-2 shrink-0 self-center mr-6">
            <div
              ref={nodeRef("input")}
              className="w-14 h-14 rounded-full bg-glass-bg border border-[rgba(212,98,42,0.2)] flex items-center justify-center"
            >
              <MicIcon />
            </div>
            <span className="text-[10px] text-muted uppercase tracking-widest">
              Voice
            </span>
          </div>

          {/* STT Engines */}
          <div className="flex-1 min-w-0 max-w-[180px]">
            <p className="text-[10px] text-muted/60 uppercase tracking-widest mb-2 pl-1">
              Transcription
            </p>
            <div className="space-y-1">
              <p className="text-[9px] text-muted/30 uppercase tracking-widest pl-1 pb-0.5">
                Local
              </p>
              {ENGINES.filter((e) => e.tag === "local").map((e) => (
                <button
                  key={e.id}
                  ref={nodeRef(`e-${e.id}`)}
                  onClick={() => setEngine(e.id)}
                  className={itemCls(engine === e.id)}
                >
                  <span className={nameCls(engine === e.id)}>{e.name}</span>
                </button>
              ))}
              <p className="text-[9px] text-muted/30 uppercase tracking-widest pl-1 pt-1 pb-0.5">
                Cloud
              </p>
              {ENGINES.filter((e) => e.tag === "cloud").map((e) => (
                <button
                  key={e.id}
                  ref={nodeRef(`e-${e.id}`)}
                  onClick={() => setEngine(e.id)}
                  className={itemCls(engine === e.id)}
                >
                  <span className={nameCls(engine === e.id)}>{e.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* LLM Providers */}
          <div className="flex-1 min-w-0 max-w-[180px]">
            <p className="text-[10px] text-muted/60 uppercase tracking-widest mb-2 pl-1">
              Post-process
            </p>
            <div className="space-y-1">
              {LLMS.map((l) => (
                <button
                  key={l.id}
                  ref={nodeRef(`l-${l.id}`)}
                  onClick={() => setLlm(l.id)}
                  className={itemCls(llm === l.id)}
                >
                  <span className={nameCls(llm === l.id)}>{l.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Polish Prompts */}
          <div className="flex-1 min-w-0 max-w-[200px]">
            <p className="text-[10px] text-muted/60 uppercase tracking-widest mb-2 pl-1">
              Polish mode
            </p>
            <div className="space-y-1">
              {PROMPTS.map((p) => (
                <button
                  key={p.id}
                  ref={nodeRef(`p-${p.id}`)}
                  onClick={() => setPrompt(p.id)}
                  className={itemCls(prompt === p.id, true)}
                >
                  <span className={nameCls(prompt === p.id)}>{p.name}</span>
                  <span
                    className={`block text-[11px] mt-0.5 transition-colors duration-200 ${
                      prompt === p.id ? "text-muted/70" : "text-muted/40"
                    }`}
                  >
                    {p.desc}
                  </span>
                </button>
              ))}
              <div className="border-t border-border my-1" />
              <button
                ref={nodeRef("p-custom")}
                onClick={() => setPrompt("custom")}
                className={itemCls(prompt === "custom", true)}
              >
                <span className={nameCls(prompt === "custom")}>Custom</span>
                <span
                  className={`block text-[11px] mt-0.5 transition-colors duration-200 ${
                    prompt === "custom" ? "text-muted/70" : "text-muted/40"
                  }`}
                >
                  Write your own prompt
                </span>
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col items-center gap-2 shrink-0 self-center ml-6">
            <div
              ref={nodeRef("output")}
              className="w-14 h-14 rounded-full bg-glass-bg border border-[rgba(212,98,42,0.2)] flex items-center justify-center"
            >
              <DocIcon />
            </div>
            <span className="text-[10px] text-muted uppercase tracking-widest">
              Text
            </span>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden space-y-2">
        {/* Input */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-10 h-10 rounded-full bg-glass-bg border border-[rgba(212,98,42,0.2)] flex items-center justify-center shrink-0">
            <MicIcon size={18} />
          </div>
          <span className="text-sm text-muted">Your voice</span>
        </div>

        <Arrow />

        {/* Engines */}
        <div>
          <p className="text-[10px] text-muted/60 uppercase tracking-widest mb-2 pl-1">
            Transcription
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ENGINES.map((e) => (
              <button
                key={e.id}
                onClick={() => setEngine(e.id)}
                className={`px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200 ${
                  engine === e.id
                    ? "bg-[rgba(212,98,42,0.1)] border border-[rgba(212,98,42,0.35)] text-accent font-medium"
                    : "border border-transparent text-muted"
                }`}
              >
                {e.name}
              </button>
            ))}
          </div>
        </div>

        <Arrow />

        {/* LLMs */}
        <div>
          <p className="text-[10px] text-muted/60 uppercase tracking-widest mb-2 pl-1">
            Post-process
          </p>
          <div className="flex flex-wrap gap-1.5">
            {LLMS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLlm(l.id)}
                className={`px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200 ${
                  llm === l.id
                    ? "bg-[rgba(212,98,42,0.1)] border border-[rgba(212,98,42,0.35)] text-accent font-medium"
                    : "border border-transparent text-muted"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        <Arrow />

        {/* Prompts */}
        <div>
          <p className="text-[10px] text-muted/60 uppercase tracking-widest mb-2 pl-1">
            Polish mode
          </p>
          <div className="space-y-1.5">
            {PROMPTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPrompt(p.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                  prompt === p.id
                    ? "bg-[rgba(212,98,42,0.1)] border border-[rgba(212,98,42,0.35)] text-accent font-medium"
                    : "border border-transparent text-muted"
                }`}
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
              className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                prompt === "custom"
                  ? "bg-[rgba(212,98,42,0.1)] border border-[rgba(212,98,42,0.35)] text-accent font-medium"
                  : "border border-transparent text-muted"
              }`}
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

        <Arrow />

        {/* Output */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-10 h-10 rounded-full bg-glass-bg border border-[rgba(212,98,42,0.2)] flex items-center justify-center shrink-0">
            <DocIcon size={18} />
          </div>
          <span className="text-sm text-muted">Polished text</span>
        </div>
      </div>
    </div>
  );
}
