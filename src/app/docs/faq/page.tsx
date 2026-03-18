import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Handless Docs",
  description: "Frequently asked questions about Handless.",
};

export default function FAQ() {
  return (
    <>
      <h1>FAQ</h1>
      <p>Frequently asked questions about Handless.</p>

      <h2>General</h2>

      <h3>Is Handless free?</h3>
      <p>
        Yes. Handless is free and open source. No subscriptions, no usage
        limits, no catch.
      </p>

      <h3>Does it work offline?</h3>
      <p>
        Yes. Local engines like Whisper, Moonshine, and Parakeet run entirely on
        your Mac — no internet required. Cloud providers obviously need a
        connection.
      </p>

      <h3>What does &quot;bring your own API keys&quot; mean?</h3>
      <p>
        Instead of routing audio through a middleman, you connect directly to
        providers like OpenAI, Deepgram, or Groq with your own API keys. Your
        data goes directly to the provider — Handless never sees it.
      </p>

      <h3>What languages are supported?</h3>
      <p>
        Depends on the engine. Whisper supports 99+ languages. Cloud providers
        vary — check each provider&apos;s documentation for specifics. The
        Handless UI itself supports 17 languages.
      </p>

      <h3>How is audio processed?</h3>
      <p>
        Audio is captured locally on your Mac and sent to your chosen engine
        (local or cloud). The resulting text is pasted into your focused app.
        With local engines, audio never leaves your machine.
      </p>

      <h2>Troubleshooting</h2>

      <h3>The shortcut isn&apos;t working</h3>
      <ul>
        <li>
          Make sure Handless has <strong>Accessibility</strong> permission in
          System Settings
        </li>
        <li>
          Try switching the keyboard implementation in{" "}
          <strong>Settings &rarr; General</strong> (HandyKeys &harr; Tauri)
        </li>
        <li>Check if another app is using the same shortcut</li>
        <li>Restart Handless</li>
      </ul>

      <h3>Transcription quality is poor</h3>
      <ul>
        <li>
          Try a larger local model (e.g. Whisper Large instead of Small)
        </li>
        <li>Use a cloud provider for better accuracy</li>
        <li>
          Add frequently misheard terms to your{" "}
          <a href="/docs/dictionary">Dictionary</a>
        </li>
        <li>Make sure your microphone is positioned well</li>
        <li>Set the correct language instead of relying on auto-detect</li>
      </ul>

      <h3>Text isn&apos;t pasting into my app</h3>
      <ul>
        <li>
          Verify <strong>Accessibility</strong> permission is granted
        </li>
        <li>
          Try a different paste method in <strong>Settings &rarr; Output</strong>
        </li>
        <li>
          Some apps block automated paste — use &quot;Copy to clipboard&quot;
          mode and paste manually
        </li>
      </ul>

      <h3>The app is using too much memory</h3>
      <p>
        Large local models can use significant memory. Set a shorter{" "}
        <strong>Model Unload Timeout</strong> in Settings &rarr; General to free
        memory after inactivity.
      </p>

      <h2>Privacy</h2>

      <h3>Is my audio stored anywhere?</h3>
      <p>
        With local engines, audio is processed on your Mac and never leaves the
        device. With cloud providers, audio is sent encrypted to the
        provider&apos;s API. Handless itself does not store or log audio files.
      </p>

      <h3>What data does Handless collect?</h3>
      <p>
        None. Handless has no analytics, no telemetry, and no phone-home
        behavior. Everything stays on your machine.
      </p>
    </>
  );
}
