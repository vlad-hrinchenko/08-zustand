"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import { useDebounce } from "use-debounce";

const App = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [debouncedSearchText] = useDebounce<string>(searchText, 300);

  const trimmedSearch = debouncedSearchText.trim();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", trimmedSearch, page],
    queryFn: () => fetchNotes(trimmedSearch, page),
    placeholderData: keepPreviousData,
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

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}

      {Array.isArray(data?.notes) && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
