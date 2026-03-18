import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polish — Handless Docs",
  description:
    "Use LLMs to clean up, reformat, or restructure your transcriptions.",
};

export default function Polish() {
  return (
    <>
      <h1>Polish</h1>
      <p>
        Post-processing uses an LLM to clean up, reformat, or restructure your
        transcriptions after they&apos;re generated.
      </p>

      <h2>How It Works</h2>
      <ol>
        <li>You speak and Handless transcribes your audio</li>
        <li>
          The raw transcription is sent to an LLM with your chosen prompt
        </li>
        <li>The LLM returns a cleaned-up version</li>
        <li>The polished text is pasted into your app</li>
      </ol>

      <h2>Providers</h2>
      <p>
        Configure a post-processing provider in{" "}
        <strong>Settings &rarr; Post-Processing</strong>:
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>OpenAI</strong>
            </td>
            <td>GPT-4o, GPT-4o-mini, and other models.</td>
          </tr>
          <tr>
            <td>
              <strong>Anthropic</strong>
            </td>
            <td>Claude Sonnet, Haiku, and other models.</td>
          </tr>
          <tr>
            <td>
              <strong>Groq</strong>
            </td>
            <td>Fast inference. Llama, Mixtral, and other models.</td>
          </tr>
          <tr>
            <td>
              <strong>Cerebras</strong>
            </td>
            <td>Ultra-fast inference.</td>
          </tr>
          <tr>
            <td>
              <strong>Gemini</strong>
            </td>
            <td>Google&apos;s Gemini models.</td>
          </tr>
          <tr>
            <td>
              <strong>Z.AI</strong>
            </td>
            <td>xAI&apos;s Grok models.</td>
          </tr>
          <tr>
            <td>
              <strong>OpenRouter</strong>
            </td>
            <td>Access many models via one API key.</td>
          </tr>
          <tr>
            <td>
              <strong>Apple Intelligence</strong>
            </td>
            <td>On-device, Apple Silicon only. No API key needed.</td>
          </tr>
          <tr>
            <td>
              <strong>Custom</strong>
            </td>
            <td>Any OpenAI-compatible endpoint.</td>
          </tr>
        </tbody>
      </table>

      <h2>Built-in Prompts</h2>
      <p>Three pre-built prompt levels to choose from:</p>
      <ul>
        <li>
          <strong>Mild — Correct Transcript</strong> — fixes typos,
          punctuation, and obvious errors. Keeps your original wording.
        </li>
        <li>
          <strong>Medium — Improve Fluency</strong> — smooths out filler words
          and awkward phrasing while preserving meaning.
        </li>
        <li>
          <strong>Aggressive — Restructure &amp; Format</strong> — rewrites for
          clarity, adds formatting (paragraphs, lists), and restructures as
          needed.
        </li>
      </ul>

      <h2>Custom Prompts</h2>
      <p>Create your own prompts for specific use cases:</p>
      <ol>
        <li>
          Go to <strong>Settings &rarr; Post-Processing</strong>
        </li>
        <li>
          Click <strong>Add Prompt</strong>
        </li>
        <li>
          Write your instructions (e.g. &quot;Format as bullet points&quot; or
          &quot;Translate to Spanish&quot;)
        </li>
        <li>Save and select it as your active prompt</li>
      </ol>

      <h2>Shortcut Binding</h2>
      <p>Link specific prompts to keyboard shortcuts for fast switching:</p>
      <ol>
        <li>
          Go to <strong>Settings &rarr; Shortcuts</strong>
        </li>
        <li>Add a new shortcut</li>
        <li>Assign a post-processing prompt to it</li>
      </ol>
      <p>
        This lets you use different polish levels without changing settings. For
        example, <kbd>Fn</kbd> for raw transcription and{" "}
        <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd> for polished
        output.
      </p>
    </>
  );
}
