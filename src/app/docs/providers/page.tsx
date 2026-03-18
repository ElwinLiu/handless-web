import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Providers — Handless Docs",
  description:
    "All supported speech-to-text engines — local and cloud — with setup instructions.",
};

export default function Providers() {
  return (
    <>
      <h1>Providers</h1>
      <p>
        Handless supports local (on-device) and cloud-based speech-to-text
        engines. Local engines need no internet. Cloud providers offer higher
        accuracy and broader language support but require API keys.
      </p>

      <h2>Local Engines</h2>
      <p>
        Download models in{" "}
        <strong>Settings &rarr; Models &rarr; Library</strong> and run them
        entirely on your Mac.
      </p>

      <table>
        <thead>
          <tr>
            <th>Engine</th>
            <th>Languages</th>
            <th>Speed</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Whisper</strong>
            </td>
            <td>99+</td>
            <td>Moderate</td>
            <td>
              OpenAI&apos;s model. Multiple sizes (small → large). Supports
              translation to English.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Parakeet</strong>
            </td>
            <td>English</td>
            <td>Fast</td>
            <td>NVIDIA NeMo. Optimized for English with high accuracy.</td>
          </tr>
          <tr>
            <td>
              <strong>Moonshine</strong>
            </td>
            <td>English</td>
            <td>Very fast</td>
            <td>Ultra-lightweight. Great for quick dictation.</td>
          </tr>
          <tr>
            <td>
              <strong>Moonshine Streaming</strong>
            </td>
            <td>English</td>
            <td>Real-time</td>
            <td>Streaming variant — shows text as you speak.</td>
          </tr>
          <tr>
            <td>
              <strong>SenseVoice</strong>
            </td>
            <td>Multiple</td>
            <td>Fast</td>
            <td>Multilingual with built-in voice activity detection.</td>
          </tr>
        </tbody>
      </table>

      <h3>Model Sizes</h3>
      <p>
        Larger models are more accurate but slower and use more memory. Choose
        based on your needs:
      </p>
      <ul>
        <li>
          <strong>Small</strong> (~40–150 MB) — fastest, good for quick notes
        </li>
        <li>
          <strong>Medium</strong> (~500 MB–1.5 GB) — balanced accuracy and speed
        </li>
        <li>
          <strong>Large</strong> (~1.5–3+ GB) — highest accuracy
        </li>
      </ul>

      <h2>Cloud Providers</h2>
      <p>
        Connect your own API keys in{" "}
        <strong>Settings &rarr; Models &rarr; My Models</strong>.
      </p>

      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Default Model</th>
            <th>Streaming</th>
            <th>Translation</th>
            <th>Diarization</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>OpenAI</strong>
            </td>
            <td>gpt-4o-mini-transcribe</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>
              <strong>Groq</strong>
            </td>
            <td>whisper-large-v3-turbo</td>
            <td>No</td>
            <td>No</td>
            <td>No</td>
          </tr>
          <tr>
            <td>
              <strong>Deepgram</strong>
            </td>
            <td>nova-3</td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <strong>AssemblyAI</strong>
            </td>
            <td>universal-3-pro</td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <strong>ElevenLabs</strong>
            </td>
            <td>scribe_v2</td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <strong>Mistral AI</strong>
            </td>
            <td>voxtral-mini-latest</td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <strong>Soniox</strong>
            </td>
            <td>stt-rt-v4</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <strong>Fireworks AI</strong>
            </td>
            <td>whisper-v3</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>
              <strong>Cartesia</strong>
            </td>
            <td>ink-whisper</td>
            <td>No</td>
            <td>No</td>
            <td>No</td>
          </tr>
          <tr>
            <td>
              <strong>Custom / Ollama</strong>
            </td>
            <td>User-configured</td>
            <td>No</td>
            <td>No</td>
            <td>No</td>
          </tr>
        </tbody>
      </table>

      <h3>Setting Up a Cloud Provider</h3>
      <ol>
        <li>
          Open <strong>Settings &rarr; Models &rarr; My Models</strong>
        </li>
        <li>Select a provider from the dropdown</li>
        <li>
          Enter your API key (click the console link to get one if needed)
        </li>
        <li>
          Click <strong>Test Connection</strong> to verify
        </li>
        <li>
          Configure provider-specific options (language, temperature, etc.)
        </li>
      </ol>

      <h3>Provider Options</h3>
      <p>
        Available options vary by provider. Common ones include:
      </p>
      <ul>
        <li>
          <strong>Language</strong> — set a specific language or leave on
          auto-detect
        </li>
        <li>
          <strong>Temperature</strong> — controls randomness (lower = more
          deterministic)
        </li>
        <li>
          <strong>Prompt / Glossary</strong> — provide context to improve
          accuracy (see <a href="/docs/dictionary">Dictionary</a>)
        </li>
        <li>
          <strong>Speaker Diarization</strong> — identify different speakers in
          the audio
        </li>
        <li>
          <strong>Realtime Streaming</strong> — show text incrementally as you
          speak
        </li>
      </ul>

      <h2>Switching Providers</h2>
      <p>Switch between providers from the main interface:</p>
      <ol>
        <li>Click the current provider name in the sidebar</li>
        <li>
          Select from your configured cloud providers or downloaded local models
        </li>
      </ol>
      <p>
        Settings for each provider are saved independently — switching
        doesn&apos;t lose your configuration.
      </p>
    </>
  );
}
