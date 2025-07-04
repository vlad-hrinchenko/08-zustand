"use client";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { useState, useEffect, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<NoteTag>(draft.tag);

  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const { mutate } = useMutation({
    mutationFn: () => createNote({ title, content, tag }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
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
