import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Start — Handless Docs",
  description: "Get up and running with Handless in under a minute.",
};

export default function QuickStart() {
  return (
    <>
      <h1>Quick Start</h1>
      <p>Get up and running with Handless in under a minute.</p>

      <h2>Download &amp; Install</h2>
      <ol>
        <li>
          Download the latest <code>.dmg</code> from{" "}
          <a href="https://github.com/ElwinLiu/handless/releases/latest">
            GitHub Releases
          </a>
        </li>
        <li>
          Open the DMG and drag <strong>Handless</strong> to your Applications
          folder
        </li>
        <li>Launch Handless from Applications</li>
      </ol>

      <h2>Grant Permissions</h2>
      <p>Handless needs two macOS permissions:</p>
      <ul>
        <li>
          <strong>Microphone</strong> — to capture your voice
        </li>
        <li>
          <strong>Accessibility</strong> — to paste transcribed text into other
          apps
        </li>
      </ul>
      <p>
        You&apos;ll be prompted on first launch. You can also grant these in{" "}
        <strong>System Settings &rarr; Privacy &amp; Security</strong>.
      </p>

      <h2>Your First Transcription</h2>
      <ol>
        <li>
          Press <kbd>Fn</kbd> to start recording
        </li>
        <li>Speak naturally</li>
        <li>
          Press <kbd>Fn</kbd> again (or release if using hold mode)
        </li>
        <li>Text appears in whatever app is focused</li>
      </ol>
      <p>
        By default, Handless uses a local Whisper model. No internet required —
        your audio never leaves your Mac.
      </p>

      <h2>Try a Cloud Provider</h2>
      <p>For better accuracy or broader language support:</p>
      <ol>
        <li>
          Open Settings &rarr; <strong>Models</strong> tab
        </li>
        <li>Select a provider (e.g. OpenAI, Deepgram, Groq)</li>
        <li>
          Paste your API key and click <strong>Test Connection</strong>
        </li>
        <li>Select the provider from the main interface</li>
      </ol>
      <p>
        See <a href="/docs/providers">Providers</a> for the full list and setup
        details.
      </p>

      <h2>Add Post-Processing</h2>
      <p>Clean up transcriptions with an LLM:</p>
      <ol>
        <li>
          Open Settings &rarr; <strong>Post-Processing</strong> tab
        </li>
        <li>Enable post-processing and select a provider</li>
        <li>Choose a prompt level: Mild, Medium, or Aggressive</li>
        <li>
          Press <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd> to
          transcribe with polish
        </li>
      </ol>
      <p>
        See <a href="/docs/polish">Polish</a> for more details.
      </p>

      <h2>Next Steps</h2>
      <ul>
        <li>
          <a href="/docs/shortcuts">Customize keyboard shortcuts</a>
        </li>
        <li>
          <a href="/docs/dictionary">Add custom terms to your dictionary</a>
        </li>
        <li>
          <a href="/docs/configuration">Explore all configuration options</a>
        </li>
      </ul>
    </>
  );
}
