import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History — Handless Docs",
  description: "Transcription history, retention settings, and statistics.",
};

export default function History() {
  return (
    <>
      <h1>History &amp; Statistics</h1>
      <p>
        Handless keeps a record of your transcriptions with full text,
        timestamps, and post-processing results.
      </p>

      <h2>Viewing History</h2>
      <p>
        Open <strong>Settings &rarr; History</strong> to browse past
        transcriptions. Each entry shows:
      </p>
      <ul>
        <li>Timestamp and auto-generated title</li>
        <li>Original transcription text</li>
        <li>Post-processed text (if polish was applied)</li>
        <li>Which prompt was used</li>
      </ul>
      <p>Use the search bar to find specific transcriptions by content.</p>

      <h2>Retention</h2>
      <p>Configure how long transcriptions are kept:</p>
      <ul>
        <li>
          <strong>Never delete</strong> — keep everything
        </li>
        <li>
          <strong>Preserve limit</strong> — keep up to a set number of entries
          (default: 5)
        </li>
        <li>
          <strong>3 days / 2 weeks / 3 months</strong> — auto-delete after the
          specified period
        </li>
      </ul>

      <h2>Statistics</h2>
      <p>
        Track your speaking stats over configurable time periods (today, 3 days,
        week, month):
      </p>
      <ul>
        <li>
          <strong>Word count</strong> — total words transcribed
        </li>
        <li>
          <strong>Duration</strong> — total recording time
        </li>
        <li>
          <strong>Transcription count</strong> — number of recordings
        </li>
        <li>
          <strong>Words per minute</strong> — your average speaking speed
        </li>
      </ul>
    </>
  );
}
