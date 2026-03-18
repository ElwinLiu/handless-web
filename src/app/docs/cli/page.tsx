import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLI — Handless Docs",
  description: "Control Handless from the command line.",
};

export default function CLI() {
  return (
    <>
      <h1>CLI</h1>
      <p>
        Control Handless from the command line for automation and scripting.
      </p>

      <h2>Available Flags</h2>
      <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--toggle-transcription</code>
            </td>
            <td>Toggle recording on/off</td>
          </tr>
          <tr>
            <td>
              <code>--toggle-post-process</code>
            </td>
            <td>Toggle recording with post-processing</td>
          </tr>
          <tr>
            <td>
              <code>--cancel</code>
            </td>
            <td>Cancel the current operation</td>
          </tr>
          <tr>
            <td>
              <code>--start-hidden</code>
            </td>
            <td>Launch without showing the window</td>
          </tr>
          <tr>
            <td>
              <code>--no-tray</code>
            </td>
            <td>Launch without a menu bar icon</td>
          </tr>
          <tr>
            <td>
              <code>--debug</code>
            </td>
            <td>Enable verbose debug logging</td>
          </tr>
        </tbody>
      </table>

      <h2>Examples</h2>
      <pre>
        <code>
          {`# Start a transcription from the terminal
handless --toggle-transcription

# Record with post-processing
handless --toggle-post-process

# Cancel current recording
handless --cancel

# Launch in the background
handless --start-hidden --no-tray

# Debug mode
handless --debug`}
        </code>
      </pre>
      <p>
        These flags are useful for binding Handless actions to tools like
        Raycast, Alfred, Hammerspoon, or shell scripts.
      </p>
    </>
  );
}
