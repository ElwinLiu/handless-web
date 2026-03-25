"use client";

import { useState, useRef, useEffect } from "react";

const REPO = "ElwinLiu/handless";
const RELEASES_URL = `https://github.com/${REPO}/releases/latest`;

const ARCH_KEYWORDS: Record<string, string[]> = {
  "apple-silicon": ["apple-silicon", "aarch64", "arm64"],
  intel: ["intel", "x64", "x86_64"],
};

async function downloadForArch(arch: "apple-silicon" | "intel") {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) throw new Error();
    const release = await res.json();
    const keywords = ARCH_KEYWORDS[arch];
    const asset = release.assets?.find(
      (a: { name: string }) =>
        a.name.endsWith(".dmg") &&
        keywords.some((kw) => a.name.includes(kw))
    );
    window.location.href = asset?.browser_download_url ?? RELEASES_URL;
  } catch {
    window.location.href = RELEASES_URL;
  }
}

export default function DownloadButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors duration-350 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <span className="relative z-20 inline-flex items-center gap-2">
          <svg
            width="15"
            height="18"
            viewBox="0 0 31 38"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M25.844 20.189c-.044-4.807 3.92-7.117 4.1-7.23-2.231-3.27-5.699-3.716-6.936-3.768-2.95-.301-5.759 1.742-7.258 1.742s-3.807-1.698-6.255-1.65c-3.22.048-6.187 1.873-7.847 4.764-3.34 5.807-.852 14.422 2.406 19.142 1.595 2.305 3.49 4.903 5.986 4.807 2.405-.097 3.311-1.559 6.212-1.559s5.173 1.559 7.639 1.511c2.583-.052 4.221-2.358 5.803-4.672 1.825-2.676 2.579-5.27 2.622-5.405-.056-.022-5.036-1.935-5.088-7.681zM21.074 6.07c1.324-1.607 2.217-3.842 1.973-6.07-1.908.079-4.216 1.275-5.584 2.882-1.224 1.42-2.3 3.694-2.012 5.877 2.122.166 4.296-.907 5.623-2.514z" />
          </svg>
          Download for macOS
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            aria-hidden="true"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M1.5 4L3.001 5.877C3.855 6.944 4.282 7.478 4.798 7.671C5.251 7.841 5.749 7.841 6.202 7.671C6.718 7.478 7.145 6.944 7.999 5.877L9.5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="absolute inset-0 z-10 translate-y-[50%] scale-0 rounded-full bg-white transition-transform duration-350 group-hover:scale-x-[150%] group-hover:scale-y-[220%]" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-52 rounded-lg border border-border-strong bg-bg p-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              downloadForArch("apple-silicon");
            }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-glass-bg"
          >
            <div>
              <div className="font-medium">Apple Silicon</div>
              <div className="text-[11px] text-muted">M-series</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              downloadForArch("intel");
            }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-glass-bg"
          >
            <div>
              <div className="font-medium">Intel</div>
              <div className="text-[11px] text-muted">x86_64</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
