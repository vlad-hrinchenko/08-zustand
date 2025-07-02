"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm({ onClose }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Todo");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Title
        <input
          className={css.input}
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          className={css.select}
          value={tag}
          onChange={(e) => setTag(e.target.value as NoteTag)}
        >
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button
          className={css.cancel}
          type="button"
          onClick={onClose}
          disabled={mutation.isPending}
        >
          Cancel
        </button>
        <button
          className={css.button}
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}
