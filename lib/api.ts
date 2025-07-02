import axios, { isAxiosError } from "axios";
import { type Note, type NoteTag } from "@/types/note";

export interface NewNoteContent {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface PaginatedNotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface DeletedNoteInfo {
  message: string;
  deletedNoteId: number;
}

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchNotes = async (
  search = "",
  page = 1,
  perPage = 12,
  tag?: string
): Promise<PaginatedNotesResponse> => {
  const response = await axiosConfig.get<PaginatedNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search && { search }),
      ...(tag && tag !== "All" && { tag }),
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response = await axiosConfig.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (content: NewNoteContent): Promise<Note> => {
  const response = await axiosConfig.post<Note>("/notes", content);
  return response.data;
};

export const deleteNote = async (id: number): Promise<DeletedNoteInfo> => {
  try {
    const response = await axiosConfig.delete<DeletedNoteInfo>(`/notes/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ?? "Failed to delete the note.";
      throw new Error(message);
    }
    throw new Error("Unknown error occurred while deleting note.");
  }
};

