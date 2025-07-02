import css from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}

export const metadata = {
  title: "Сторінку не знайдено — NoteHub",
  description:
    "На жаль, такої сторінки не існує. Перевірте адресу і спробуйте ще раз.",
  openGraph: {
    title: "Сторінку не знайдено — NoteHub",
    description:
      "На жаль, такої сторінки не існує. Перевірте адресу і спробуйте ще раз.",
    url: "https://your-site-url.com/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};
