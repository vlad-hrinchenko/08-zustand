import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface Props {
  params: { slug?: string[] };
}

export default async function NotesByTagPage({ params }: Props) {
  const tag = params.slug?.[0] || "All";
  const data = await fetchNotes("", 1, 12, tag === "All" ? undefined : tag);

  return (
    <NotesClient notes={data.notes} totalPages={data.totalPages} tag={tag} />
  );
}
