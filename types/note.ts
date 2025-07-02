export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
}

// 👇 Додаємо інтерфейс відповіді з пагінацією
export interface PaginatedNotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
  totalResults: number;
}

