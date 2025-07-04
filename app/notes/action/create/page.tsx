// ✅ FILE: app/notes/action/create/page.tsx

import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import styles from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Створити нотатку — NoteHub",
  description: "Сторінка створення нової нотатки у застосунку NoteHub.",
  openGraph: {
    title: "Створити нотатку — NoteHub",
    description: "Сторінка створення нової нотатки у застосунку NoteHub.",
    url: "https://your-site-url.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
