"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const THINKING_DURATIONS = [1.3, 1.7, 1.1, 1.5, 1.9, 1.25];
const THINKING_DELAYS = [0, 0.4, 0.15, 0.65, 0.3, 0.8];

const DEMO_RAW =
  "There are a few things I wanted to um mention about the project update. First, the backend migration is going to be done by uh Friday next week. Second, we managed to cut the the response time down from like three hundred milliseconds to uh fifty milliseconds, which is pretty significant. And third, the new API endpoints are — well actually not all of them but most of them — are already deployed to staging.";

const DEMO_PROCESSED =
  "There are a few things I wanted to mention about the project update:\n\n1. The backend migration will be completed by Friday next week.\n2. We managed to cut the response time down from 300 milliseconds to 50 milliseconds, which is significant.\n3. Most of the new API endpoints are already deployed to staging.";

type OverlayState = "idle" | "recording" | "thinking" | "done";

/** Simulated waveform sticks with random heights */
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
      className="overflow-y-hidden"
      style={{
        color: "rgba(255,255,255,0.92)",
        fontSize: 12,
        fontWeight: 450,
        lineHeight: "18px",
        maxHeight: 72,
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
        color: "rgba(var(--color-text-rgb),0.92)",
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
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-semibold transition-all duration-300"
          style={
            state === "idle"
              ? {
                  background: "var(--color-surface)",
                  border: "2px solid var(--color-glass-border)",
                  color: "rgba(var(--color-text-rgb),0.7)",
                  cursor: "pointer",
                }
              : isDone
                ? {
                    background: "var(--color-surface)",
                    border: "2px solid var(--color-glass-border)",
                    color: "rgba(var(--color-text-rgb),0.7)",
                    cursor: "pointer",
                  }
                : {
                    background: "rgba(239,111,47,0.2)",
                    border: "2px solid rgba(239,111,47,0.4)",
                    color: "#ef6f2f",
                    boxShadow: "0 0 24px rgba(239,111,47,0.25)",
                    cursor: "default",
                  }
          }
        >
          fn
        </div>
        {state === "idle" && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted/60 whitespace-nowrap">
            Click to try
          </span>
        )}
        {isDone && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted/60 whitespace-nowrap">
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
                  <MiniWaveform />
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
            className="overflow-hidden -mt-2"
            style={{
              width: 280,
              padding: "8px 12px",
              borderRadius: 12,
              background: "radial-gradient(ellipse at 50% 0%, rgb(16,11,8) 0%, rgb(8,6,4) 100%)",
              border: "1px solid rgba(239,111,47,0.07)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5), 0 0 0.5px rgba(0,0,0,0.5), inset 0 1px 0 rgba(239,111,47,0.04)",
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
                background: "var(--color-glass-bg)",
                border: "1px solid var(--color-glass-border)",
              }}
            >
              <p
                className="text-[10px] font-medium uppercase tracking-wider mb-2"
                style={{ color: "rgba(var(--color-muted-rgb),0.6)" }}
              >
                Raw transcript
              </p>
              <p
                style={{
                  color: "rgba(var(--color-text-rgb),0.5)",
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
                background: "var(--color-surface)",
                border: "1px solid rgba(var(--color-accent-rgb),0.15)",
                boxShadow: "0 0 20px rgba(var(--color-accent-rgb),0.05)",
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
