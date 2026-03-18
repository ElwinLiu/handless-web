import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shortcuts — Handless Docs",
  description:
    "Default keyboard shortcuts, activation modes, and customization.",
};

export default function Shortcuts() {
  return (
    <>
      <h1>Keyboard Shortcuts</h1>
      <p>
        Handless is controlled via global keyboard shortcuts that work
        system-wide — no need to focus the app window.
      </p>

      <h2>Default Shortcuts</h2>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>macOS</th>
            <th>Windows / Linux</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Transcribe</strong>
            </td>
            <td>
              <kbd>Fn</kbd>
            </td>
            <td>
              <kbd>Ctrl</kbd> + <kbd>Space</kbd>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Transcribe + Polish</strong>
            </td>
            <td>
              <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd>
            </td>
            <td>
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Cancel</strong>
            </td>
            <td>
              <kbd>Escape</kbd>
            </td>
            <td>
              <kbd>Escape</kbd>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Activation Modes</h2>
      <p>Choose how the recording shortcut behaves:</p>
      <ul>
        <li>
          <strong>Hold or Toggle</strong> (default) — press once to start, again
          to stop. Or hold to record, release to stop.
        </li>
        <li>
          <strong>Toggle</strong> — press once to start, press again to stop.
        </li>
        <li>
          <strong>Hold</strong> — hold the key to record, release to stop.
          Classic push-to-talk.
        </li>
      </ul>

      <h2>Customizing Shortcuts</h2>
      <ol>
        <li>
          Open <strong>Settings &rarr; Shortcuts</strong>
        </li>
        <li>Click on a shortcut binding to edit it</li>
        <li>Press your desired key combination</li>
        <li>The new binding is saved immediately</li>
      </ol>
      <p>
        You can add multiple shortcuts, each linked to a specific
        post-processing prompt. See{" "}
        <a href="/docs/polish">Polish &rarr; Shortcut Binding</a>.
      </p>

      <h2>Keyboard Implementation</h2>
      <p>Handless offers two keyboard backends:</p>
      <ul>
        <li>
          <strong>HandyKeys</strong> (default on macOS) — custom keyboard
          library, more robust, supports the <kbd>Fn</kbd> key.
        </li>
        <li>
          <strong>Tauri</strong> (default on Windows/Linux) — cross-platform
          global shortcut plugin.
        </li>
      </ul>
      <p>
        Switch between them in{" "}
        <strong>Settings &rarr; General &rarr; Keyboard Implementation</strong>{" "}
        if you experience shortcut issues.
      </p>
    </>
  );
}
