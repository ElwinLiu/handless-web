"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

const NAV = [
  { href: "/docs", label: "Quick Start" },
  { href: "/docs/providers", label: "Providers" },
  { href: "/docs/polish", label: "Polish" },
  { href: "/docs/shortcuts", label: "Shortcuts" },
  { href: "/docs/configuration", label: "Configuration" },
  { href: "/docs/dictionary", label: "Dictionary" },
  { href: "/docs/history", label: "History" },
  { href: "/docs/cli", label: "CLI" },
  { href: "/docs/faq", label: "FAQ" },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentIndex = NAV.findIndex((n) => n.href === pathname);
  const prev = currentIndex > 0 ? NAV[currentIndex - 1] : null;
  const next = currentIndex < NAV.length - 1 ? NAV[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
            >
              <img
                src="/logo.svg"
                alt=""
                width={20}
                height={20}
                className="rounded-sm"
              />
              <span className="hidden sm:inline">Handless</span>
            </Link>
            <span className="text-muted/40">/</span>
            <span className="text-sm font-medium">Docs</span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-md text-muted hover:text-text transition-colors"
              aria-label="Toggle navigation"
            >
              {sidebarOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl lg:flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block w-full lg:w-52 shrink-0 border-b lg:border-b-0 lg:border-r border-border px-6 py-4 lg:py-8 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto`}
        >
          <nav
            className="flex flex-col gap-0.5"
            onClick={() => setSidebarOpen(false)}
          >
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  pathname === href
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted hover:text-text"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 py-8 lg:py-12 lg:px-12">
          <article className="docs-content max-w-3xl">{children}</article>

          {(prev || next) && (
            <nav className="mt-12 flex items-center justify-between border-t border-border pt-6 max-w-3xl">
              {prev ? (
                <Link
                  href={prev.href}
                  className="text-sm text-muted hover:text-text transition-colors"
                >
                  &larr; {prev.label}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={next.href}
                  className="text-sm text-muted hover:text-text transition-colors"
                >
                  {next.label} &rarr;
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </main>
      </div>
    </div>
  );
}
