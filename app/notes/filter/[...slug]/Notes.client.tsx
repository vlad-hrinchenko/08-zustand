"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";

interface NotesClientProps {
  notes: Note[];
  totalPages: number;
  tag: string;
}

export default function NotesClient({
  notes,
  totalPages,
  tag,
}: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const trimmedSearch = debouncedSearchText.trim();
  const tagForQuery = tag === "All" ? undefined : tag;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", trimmedSearch, page, tag],
    queryFn: () => fetchNotes(trimmedSearch, page, 12, tagForQuery),
    placeholderData: keepPreviousData,
    initialData: {
      notes,
      totalPages,
      page: 1,
      totalResults: notes.length,
    },
  });

  return (
    <div>
      <header>
        <SearchBox
          value={searchText}
          onChange={(value: string) => {
            setSearchText(value);
            setPage(1);
          }}
        />
        {!!data?.totalPages && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)}>Create note +</button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}
      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
