"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const THINKING_DURATIONS = [1.3, 1.7, 1.1, 1.5, 1.9, 1.25];
const THINKING_DELAYS = [0, 0.4, 0.15, 0.65, 0.3, 0.8];

const DEMO_RAW =
  "There are a few things I wanted to um mention about the project update. First, the backend migration is going to be done by uh Friday next week. Second, we managed to cut the the response time down from like three hundred milliseconds to uh fifty milliseconds, which is pretty significant. And third, the new API endpoints are — well actually not all of them but most of them — are already deployed to staging.";

const DEMO_PROCESSED =
  "There are a few things I wanted to mention about the project update:\n\n1. The backend migration will be completed by Friday next week.\n2. We managed to cut the response time down from 300 milliseconds to 50 milliseconds, which is significant.\n3. Most of the new API endpoints are already deployed to staging.";

const WAVEFORM_STICKS = 28;

type OverlayState = "idle" | "recording" | "thinking" | "done";

/** Simulated waveform sticks with random heights */
function WaveformSticks() {
  const [sticks, setSticks] = useState<number[]>(() =>
    Array.from({ length: WAVEFORM_STICKS }, () => Math.random()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setSticks((prev) =>
        prev.map((v) => {
          const target = Math.random();
          return v + (target - v) * 0.3;
        }),
      );
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-[1px] h-5 mx-1">
      {sticks.map((energy, i) => {
        const height = 2 + energy * 16;
        const alpha = 0.35 + energy * 0.5;
        return (
          <div
            key={i}
            className="rounded-full transition-all duration-100"
            style={{
              width: 1.5,
              height,
              backgroundColor: `rgba(var(--color-accent-rgb), ${alpha})`,
              boxShadow:
                energy > 0.6
                  ? `0 0 ${3 + energy * 6}px rgba(var(--color-accent-rgb), ${energy * 0.4})`
                  : "none",
            }}
          />
        );
      })}
    </div>
  );
}

/** Streaming text with word-by-word appear animation */
function StreamingText({
  text,
  durationMs,
}: {
  text: string;
  durationMs: number;
}) {
  const words = text.split(/\s+/);
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = durationMs / words.length;
    let count = 0;
    const id = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= words.length) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, durationMs]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleCount]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto"
      style={{
        color: "rgba(255,255,255,0.92)",
        fontSize: 13,
        fontWeight: 400,
        lineHeight: "20px",
        maxHeight: 120,
        overflowWrap: "break-word",
      }}
    >
      {words.slice(0, visibleCount).map((word, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className={i >= visibleCount - 1 ? "word-appear" : undefined}>
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Thinking dots */
function ThinkingDots() {
  return (
    <div className="flex items-center justify-center gap-[3px] h-6 px-3 z-[1]">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="thinking-dot"
          style={{
            animationDuration: `${THINKING_DURATIONS[i]}s`,
            animationDelay: `${THINKING_DELAYS[i]}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Progress fill bar */
function ProgressFill({ progress }: { progress: number }) {
  return (
    <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
  );
}

/** Processed text that types in line-by-line */
function ProcessedText({ text }: { text: string }) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      setCharCount(n);
      if (n >= text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [text]);

  const visible = text.slice(0, charCount);

  return (
    <div
      className="whitespace-pre-wrap"
      style={{
        color: "rgba(255,255,255,0.92)",
        fontSize: 13,
        fontWeight: 400,
        lineHeight: "20px",
      }}
    >
      {visible}
      {charCount < text.length && <span className="sim-cursor" />}
    </div>
  );
}

export default function FnOverlay() {
  const [state, setState] = useState<OverlayState>("idle");
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cleanup = useCallback(() => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const startDemo = useCallback(() => {
    if (state !== "idle") return;
    cleanup();
    setState("recording");
    setProgress(0);

    // After 8s recording → thinking
    timersRef.current.push(
      setTimeout(() => {
        setState("thinking");
        setProgress(0);
        const startTime = Date.now();
        progressRef.current = setInterval(() => {
          const elapsed = (Date.now() - startTime) / 1000;
          const t = Math.min(elapsed / 2, 1);
          const eased = 1 - Math.pow(1 - t, 2.5);
          setProgress(eased * 0.85);
        }, 50);

        // After 2s thinking → done
        timersRef.current.push(
          setTimeout(() => {
            if (progressRef.current) {
              clearInterval(progressRef.current);
              progressRef.current = null;
            }
            setProgress(1);
            setState("done");
          }, 2000),
        );
      }, 8000),
    );
  }, [state, cleanup]);

  const reset = useCallback(() => {
    cleanup();
    setState("idle");
    setProgress(0);
  }, [cleanup]);

  useEffect(() => cleanup, [cleanup]);

  const isRecording = state === "recording";
  const isThinking = state === "thinking";
  const isDone = state === "done";
  const isActive = state !== "idle";

  // Pill dimensions
  const pillWidth = isActive ? 70 : 0;
  const pillHeight = isActive ? 33 : 0;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
      {/* Fn Key Button */}
      <motion.button
        onClick={isDone ? reset : startDemo}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isRecording || isThinking}
      >
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
            state === "idle"
              ? "bg-[#1c1916] border-2 border-[rgba(200,170,140,0.15)] text-[#f0ece8]/70 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.15)] cursor-pointer"
              : isDone
                ? "bg-[#1c1916] border-2 border-[rgba(200,170,140,0.15)] text-[#f0ece8]/70 hover:border-[var(--color-accent)]/40 cursor-pointer"
                : "bg-[var(--color-accent)]/20 border-2 border-[var(--color-accent)]/40 text-[var(--color-accent)] shadow-[0_0_24px_rgba(var(--color-accent-rgb),0.25)] cursor-default"
          }`}
        >
          fn
        </div>
        {state === "idle" && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-[#8a8480]/60 whitespace-nowrap">
            Click to try
          </span>
        )}
        {isDone && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-[#8a8480]/60 whitespace-nowrap">
            Click to reset
          </span>
        )}
      </motion.button>

      {/* Overlay pill — waveform / thinking */}
      <div className="flex items-start justify-center w-full" style={{ minHeight: 40 }}>
        <AnimatePresence>
          {(isRecording || isThinking) && (
            <motion.div
              className={`recording-pill relative flex items-center justify-center overflow-hidden ${isActive ? "active" : ""}`}
              initial={{ opacity: 0, scale: 0.85, width: 33, height: 33 }}
              animate={{
                opacity: 1,
                scale: 1,
                width: pillWidth,
                height: pillHeight,
                borderRadius: 999,
              }}
              exit={{
                opacity: 0,
                scale: 0.85,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
              transition={{
                opacity: { duration: 0.18 },
                scale: {
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                },
                width: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{
                padding: 6,
                minHeight: 33,
              }}
            >
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <WaveformSticks />
                </motion.div>
              )}
              {isThinking && (
                <>
                  <ProgressFill progress={progress} />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ThinkingDots />
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transcription bubble — below the pill during recording */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm rounded-xl px-4 py-3 -mt-2"
            style={{
              background: "rgba(20, 16, 12, 0.85)",
              border: "1px solid rgba(200, 170, 140, 0.12)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            <StreamingText text={DEMO_RAW} durationMs={7500} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result comparison — raw vs processed */}
      <AnimatePresence>
        {isDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full grid grid-cols-2 gap-4"
          >
            {/* Raw transcript */}
            <div
              className="rounded-xl px-4 py-3"
              style={{
                background: "rgba(20, 16, 12, 0.6)",
                border: "1px solid rgba(200, 170, 140, 0.08)",
              }}
            >
              <p
                className="text-[10px] font-medium uppercase tracking-wider mb-2"
                style={{ color: "rgba(154, 147, 144, 0.6)" }}
              >
                Raw transcript
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 13,
                  lineHeight: "20px",
                }}
              >
                {DEMO_RAW}
              </p>
            </div>
            {/* Processed */}
            <div
              className="rounded-xl px-4 py-3"
              style={{
                background: "rgba(20, 16, 12, 0.85)",
                border: "1px solid rgba(212, 98, 42, 0.15)",
                boxShadow: "0 0 20px rgba(212, 98, 42, 0.05)",
              }}
            >
              <p
                className="text-[10px] font-medium uppercase tracking-wider mb-2"
                style={{ color: "var(--color-accent)", opacity: 0.6 }}
              >
                Processed
              </p>
              <ProcessedText text={DEMO_PROCESSED} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
