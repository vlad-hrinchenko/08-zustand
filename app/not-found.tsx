import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сторінку не знайдено — NoteHub",
  description: "Ця сторінка не існує. Можливо, ви ввели неправильну адресу.",
  openGraph: {
    title: "Сторінку не знайдено — NoteHub",
    description: "Ця сторінка не існує. Можливо, ви ввели неправильну адресу.",
    url: "https://your-site-url.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function NotFoundPage() {
  return <h1>Сторінку не знайдено</h1>;
}
