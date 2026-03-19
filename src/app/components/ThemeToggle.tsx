"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const options = [
  { value: "dark" as const, label: "Dark", icon: MoonIcon },
  { value: "light" as const, label: "Light", icon: SunIcon },
  { value: "system" as const, label: "System", icon: MonitorIcon },
];

/** Must match the container's p-1 in the JSX below */
const CONTAINER_PAD = 4;
/** Extra breathing room added to each expanded button's measured width */
const EXPAND_BUFFER = 8;
/** Fallback if the collapsed measurement element is missing */
const COLLAPSED_FALLBACK = 28;

const LABEL_CLASSES =
  "font-mono text-[12px] leading-none tracking-[-0.015rem] uppercase whitespace-nowrap";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const measureRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);
  const resizeRaf = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [widths, setWidths] = useState<{
    collapsed: number;
    expanded: Record<string, number>;
  } | null>(null);

  // Measure all button widths once on mount from hidden elements
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const expanded: Record<string, number> = {};
    el.querySelectorAll<HTMLElement>("[data-value]").forEach((n) => {
      expanded[n.dataset.value!] = n.offsetWidth + EXPAND_BUFFER;
    });
    const collapsed =
      el.querySelector<HTMLElement>("[data-collapsed]")?.offsetWidth ||
      COLLAPSED_FALLBACK;
    setWidths({ collapsed, expanded });
  }, []);

  /** Apply indicator position — shared by theme-change and resize paths */
  function applyIndicator(pad: number, animate: boolean) {
    if (!widths || !theme) return;
    const el = indicatorRef.current;
    if (!el) return;
    const activeIndex = options.findIndex((o) => o.value === theme);
    const x = pad + activeIndex * widths.collapsed;
    const w = widths.expanded[theme] || widths.collapsed;
    if (!animate) {
      el.style.transition = "none";
      el.style.transform = `translateX(${x}px)`;
      el.style.width = `${w}px`;
      el.offsetHeight; // force reflow so "none" takes effect
      el.style.transition = "";
    } else {
      el.style.transform = `translateX(${x}px)`;
      el.style.width = `${w}px`;
    }
  }

  // Position indicator and re-enable page transitions after theme change
  useEffect(() => {
    if (!widths || !theme) return;
    applyIndicator(CONTAINER_PAD, !isFirst.current);
    isFirst.current = false;

    // Re-enable page transitions (only if they were disabled by handleSwitch)
    if (document.documentElement.classList.contains("disable-transitions")) {
      const id = requestAnimationFrame(() => {
        document.documentElement.classList.remove("disable-transitions");
      });
      return () => cancelAnimationFrame(id);
    }
  }, [widths, theme]);

  // Recalculate on resize — rAF-debounced
  useEffect(() => {
    if (!widths) return;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf.current);
      resizeRaf.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;
        const pad = parseFloat(getComputedStyle(container).paddingLeft);
        applyIndicator(pad, false);
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(resizeRaf.current);
    };
  }, [widths, theme]);

  function handleSwitch(value: (typeof options)[number]["value"]) {
    document.documentElement.classList.add("disable-transitions");
    setTheme(value);
  }

  // Hidden measurement elements — removed once measured
  const measureEl = !widths && (
    <div
      ref={measureRef}
      className="pointer-events-none fixed -left-[9999px] -top-[9999px] flex"
      aria-hidden="true"
    >
      <button
        data-collapsed
        className="flex items-center justify-center px-2 h-6"
      >
        <span className="flex-shrink-0">
          <MoonIcon />
        </span>
      </button>
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          data-value={value}
          className="flex items-center gap-1 px-2 h-6"
        >
          <span className="flex-shrink-0">
            <Icon />
          </span>
          <span className={LABEL_CLASSES}>{label}</span>
        </button>
      ))}
    </div>
  );

  if (!widths || !theme) {
    return (
      <>
        {measureEl}
        <div className="h-8 w-[104px]" />
      </>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex rounded-lg border border-border bg-surface p-1 min-w-max"
      role="radiogroup"
      aria-label="Theme"
    >
      <div
        ref={indicatorRef}
        className="theme-selector-indicator absolute left-0 top-1 rounded-md bg-toggle-bg h-6"
      />

      {options.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            role="radio"
            aria-checked={isActive}
            aria-label={`Switch to ${label} theme`}
            title={label}
            onClick={() => handleSwitch(value)}
            className={`theme-selector-button relative z-10 flex cursor-pointer items-center justify-center rounded-md h-6 gap-1 px-2 overflow-hidden ${
              isActive ? "text-bg" : "text-muted hover:text-text"
            }`}
            style={{
              width: isActive ? widths.expanded[value] : widths.collapsed,
            }}
          >
            <span className="flex-shrink-0 -translate-x-[2px]">
              <Icon />
            </span>
            {isActive && <span className={LABEL_CLASSES}>{label}</span>}
          </button>
        );
      })}
    </div>
  );
}
