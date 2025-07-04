"use client";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { useTransition } from "react";
import styles from "./NoteForm.module.css";
import { createNoteAction } from "@/lib/actions";
import { NoteTag } from "@/types/note";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    router.back();
  };

  return (
    <form
      action={async (formData) => {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tag = formData.get("tag") as NoteTag;

        await createNoteAction({ title, content, tag });
        clearDraft();

        startTransition(() => {
          router.back();
        });
      }}
      className={styles.form}
    >
      <label className={styles.label}>
        Title
        <input
          type="text"
          name="title"
          className={styles.input}
          defaultValue={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          required
        />
      </label>

      <label className={styles.label}>
        Content
        <textarea
          name="content"
          className={styles.textarea}
          defaultValue={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </label>

      <label className={styles.label}>
        Tag
        <select
          name="tag"
          className={styles.select}
          defaultValue={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.button} disabled={isPending}>
          Create note
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={styles.cancel}
          disabled={isPending}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
