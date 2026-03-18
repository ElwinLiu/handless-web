import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuration — Handless Docs",
  description: "All Handless settings — audio, app, output, and data options.",
};

export default function Configuration() {
  return (
    <>
      <h1>Configuration</h1>
      <p>
        All settings are accessible from the Handless settings window. This page
        covers every available option.
      </p>

      <h2>Audio</h2>

      <h3>Microphone</h3>
      <p>
        Select which microphone to use. You can set a priority list — if your
        preferred mic is unavailable (e.g. laptop lid closed), Handless falls
        back to the next one.
      </p>

      <h3>Mute System Audio</h3>
      <p>
        Automatically mute system audio while recording to prevent capturing
        playback in your transcription.
      </p>

      <h3>Audio Feedback</h3>
      <p>
        A sound plays when recording starts and stops. Adjust the volume or
        choose a sound (Marimba, Pop, or custom). Set to zero to disable.
      </p>

      <h3>Output Device</h3>
      <p>Choose which audio device plays feedback sounds.</p>

      <h2>App</h2>

      <h3>Theme</h3>
      <p>
        Switch between <strong>Dark</strong>, <strong>Light</strong>, and{" "}
        <strong>System</strong> (follows your OS preference).
      </p>

      <h3>Language</h3>
      <p>
        The Handless UI is available in 17 languages: Arabic, Czech, German,
        English, Spanish, French, Italian, Japanese, Korean, Polish, Portuguese,
        Russian, Turkish, Ukrainian, Vietnamese, Chinese (Simplified), and
        Chinese (Traditional).
      </p>

      <h3>Start Hidden</h3>
      <p>Launch without showing the window. The app runs in the menu bar.</p>

      <h3>Autostart</h3>
      <p>Automatically launch Handless when you log in.</p>

      <h3>Tray Icon</h3>
      <p>Show or hide the menu bar icon.</p>

      <h3>Recording Overlay</h3>
      <p>
        A floating overlay shows recording status. Position it at the{" "}
        <strong>Top</strong> or <strong>Bottom</strong> of the screen, or{" "}
        <strong>None</strong> to disable.
      </p>

      <h3>Model Unload Timeout</h3>
      <p>
        Local models stay in memory for faster transcriptions. Set when to
        unload: Never, Immediately, 2 / 5 / 10 / 15 minutes, or 1 hour.
      </p>

      <h2>Output</h2>

      <h3>Paste Method</h3>
      <p>How Handless types transcribed text into your app:</p>
      <ul>
        <li>
          <strong>Cmd+V</strong> — standard paste (default)
        </li>
        <li>
          <strong>Direct paste</strong> — direct input method
        </li>
        <li>
          <strong>Shift+Insert</strong> — alternative paste shortcut
        </li>
        <li>
          <strong>Ctrl+Shift+V</strong> — paste without formatting
        </li>
        <li>
          <strong>External script</strong> — run a custom script
        </li>
        <li>
          <strong>None</strong> — copy to clipboard only, don&apos;t paste
        </li>
      </ul>

      <h3>Clipboard</h3>
      <p>
        Choose whether to copy the transcription to the clipboard or leave the
        clipboard unchanged (text is pasted directly).
      </p>

      <h3>Auto-Submit</h3>
      <p>
        Automatically press <kbd>Enter</kbd> (or <kbd>Ctrl</kbd> +{" "}
        <kbd>Enter</kbd> / <kbd>Cmd</kbd> + <kbd>Enter</kbd>) after pasting.
        Useful for chat apps and search bars.
      </p>

      <h3>Trailing Space</h3>
      <p>
        Append a space after each transcription so you can continue typing
        seamlessly.
      </p>

      <h2>Data</h2>

      <h3>Export / Import Settings</h3>
      <p>
        Export your configuration as JSON to back up or transfer to another
        machine. Import to restore.
      </p>

      <h3>App Data Directory</h3>
      <p>
        View where Handless stores models, history, and configuration files.
      </p>

      <h3>Logs</h3>
      <p>
        Access log files for troubleshooting. Set the log level in debug mode
        (Trace, Debug, Info, Warn, Error).
      </p>
    </>
  );
}
