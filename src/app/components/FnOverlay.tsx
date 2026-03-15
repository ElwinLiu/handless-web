"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const THINKING_DURATIONS = [1.3, 1.7, 1.1, 1.5, 1.9, 1.25];
const THINKING_DELAYS = [0, 0.4, 0.15, 0.65, 0.3, 0.8];

const DEMO_TEXT =
  "Hey, I just wanted to quickly dictate a note about the meeting we had earlier. The main takeaway was that we need to ship the new dashboard by end of next week, and the design team will provide updated mockups by Wednesday.";

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
      className="overflow-y-hidden px-1.5"
      style={{
        color: "rgba(255,255,255,0.92)",
        fontSize: 12,
        fontWeight: 450,
        lineHeight: "18px",
        maxHeight: 90,
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

export default function FnOverlay() {
  const [state, setState] = useState<OverlayState>("idle");
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startDemo = useCallback(() => {
    if (state !== "idle") return;
    cleanup();
    setState("recording");
    setProgress(0);

    // After 4s recording → thinking
    timeoutRef.current = setTimeout(() => {
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
      timeoutRef.current = setTimeout(() => {
        cleanup();
        setProgress(1);
        setTimeout(() => {
          setState("idle");
          setProgress(0);
        }, 300);
      }, 2000);
    }, 4000);
  }, [state, cleanup]);

  useEffect(() => cleanup, [cleanup]);

  const isRecording = state === "recording";
  const isThinking = state === "thinking";
  const isActive = state !== "idle";
  const showText = isRecording;

  // Pill dimensions
  const pillWidth = isActive ? (showText ? 300 : 70) : 0;
  const pillHeight = isActive ? 33 : 0;
  const pillRadius = showText ? 14 : 999;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Fn Key Button */}
      <motion.button
        onClick={startDemo}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={state !== "idle"}
      >
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
            state === "idle"
              ? "bg-[#1c1916] border-2 border-[rgba(200,170,140,0.15)] text-[#f0ece8]/70 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.15)] cursor-pointer"
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
      </motion.button>

      {/* Overlay pill */}
      <div className="h-[100px] flex items-start justify-center w-full">
        <AnimatePresence>
          {isActive && (
            <motion.div
              className={`recording-pill relative flex items-center justify-center overflow-hidden ${isActive ? "active" : ""}`}
              initial={{ opacity: 0, scale: 0.85, width: 33, height: 33 }}
              animate={{
                opacity: 1,
                scale: 1,
                width: pillWidth,
                height: showText ? "auto" : pillHeight,
                borderRadius: pillRadius,
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
                borderRadius: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{
                padding: 6,
                minHeight: 33,
                clipPath: `inset(0 round ${pillRadius}px)`,
              }}
            >
              {/* Recording state */}
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  {showText ? (
                    <StreamingText text={DEMO_TEXT} durationMs={3800} />
                  ) : (
                    <WaveformSticks />
                  )}
                </motion.div>
              )}

              {/* Thinking state */}
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
    </div>
  );
}
