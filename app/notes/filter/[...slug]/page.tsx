import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const tag = params.slug?.[0] || "All";

  const title = `Фільтр: ${tag} — NoteHub`;
  const description = `Переглядайте нотатки з тегом ${tag} у застосунку NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-site-url.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

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
