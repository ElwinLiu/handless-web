import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dictionary — Handless Docs",
  description:
    "Add custom terms and context to improve transcription accuracy.",
};

export default function Dictionary() {
  return (
    <>
      <h1>Dictionary</h1>
      <p>
        The dictionary helps Handless transcribe specialized terms, names, and
        jargon correctly.
      </p>

      <h2>How It Works</h2>
      <p>
        When you add terms, they&apos;re sent as hints to the transcription
        engine. This improves recognition of words that might otherwise be
        misheard — technical terms, brand names, acronyms, or uncommon proper
        nouns.
      </p>

      <h2>Adding Terms</h2>
      <ol>
        <li>
          Open <strong>Settings &rarr; Dictionary</strong>
        </li>
        <li>Add terms separated by commas, spaces, or newlines</li>
        <li>Terms are automatically included in future transcriptions</li>
      </ol>
      <p>
        Examples: <code>Kubernetes</code>, <code>PostgreSQL</code>,{" "}
        <code>Vercel</code>, <code>NVIDIA</code>, <code>TailwindCSS</code>
      </p>

      <h2>Context Description</h2>
      <p>
        Add a context description to give the engine more background about what
        you typically discuss:
      </p>
      <blockquote>
        I&apos;m a software engineer discussing web development, React,
        TypeScript, and cloud infrastructure.
      </blockquote>
      <p>
        This helps the engine make better guesses when words are ambiguous.
      </p>

      <h2>Provider Support</h2>
      <p>Not all providers use dictionary data the same way:</p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Terms</th>
            <th>Context</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>OpenAI</strong>
            </td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Prompt injection</td>
          </tr>
          <tr>
            <td>
              <strong>Groq</strong>
            </td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Prompt injection</td>
          </tr>
          <tr>
            <td>
              <strong>Fireworks AI</strong>
            </td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Prompt injection</td>
          </tr>
          <tr>
            <td>
              <strong>Soniox</strong>
            </td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Context terms + description</td>
          </tr>
          <tr>
            <td>
              <strong>Deepgram</strong>
            </td>
            <td>Yes</td>
            <td>No</td>
            <td>Keywords</td>
          </tr>
          <tr>
            <td>
              <strong>AssemblyAI</strong>
            </td>
            <td>Yes</td>
            <td>No</td>
            <td>Keywords prompt</td>
          </tr>
          <tr>
            <td>
              <strong>ElevenLabs</strong>
            </td>
            <td>Yes</td>
            <td>No</td>
            <td>Keywords</td>
          </tr>
          <tr>
            <td>
              <strong>Mistral AI</strong>
            </td>
            <td>No</td>
            <td>Yes</td>
            <td>Context bias</td>
          </tr>
          <tr>
            <td>
              <strong>Cartesia</strong>
            </td>
            <td>No</td>
            <td>No</td>
            <td>—</td>
          </tr>
          <tr>
            <td>
              <strong>Local (Whisper)</strong>
            </td>
            <td>Yes</td>
            <td>No</td>
            <td>Prompt</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
