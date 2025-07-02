"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import type { Note } from "../../../types/note";

interface NoteDetailsClientProps {
  noteId: number;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false, // ✅ Виправлення згідно з вимогами
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Failed to load note.</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <span>{note.tag}</span>
    </div>
  );
}
