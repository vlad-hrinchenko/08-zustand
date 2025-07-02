"use client";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { useState, useEffect, FormEvent } from "react";
import styles from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<NoteTag>(draft.tag);

  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNote({ title, content, tag });
      clearDraft();
      router.back();
    } catch (err) {
      console.error("Error creating note", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Title
        <input
          type="text"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Content
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <label className={styles.label}>
        Tag
        <select
          className={styles.select}
          value={tag}
          onChange={(e) => setTag(e.target.value as NoteTag)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.button}>
          Save
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.cancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
