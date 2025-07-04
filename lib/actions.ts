"use server";

import { revalidateTag } from "next/cache";
import { createNote } from "./api";
import { NoteTag } from "@/types/note";

export async function createNoteAction({
  title,
  content,
  tag,
}: {
  title: string;
  content: string;
  tag: NoteTag;
}) {
  await createNote({ title, content, tag });
  revalidateTag("notes");
}
