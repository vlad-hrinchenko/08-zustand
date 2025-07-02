"use client";

export default function NoteError({ error }: { error: Error }) {
  return <p>❌ Error loading note: {error.message}</p>;
}
