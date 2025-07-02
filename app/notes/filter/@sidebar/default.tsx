// ✅ FILE: app/notes/filter/@sidebar/default.tsx

import Link from "next/link";
import styles from "@/components/SidebarNotes/SidebarNotes.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function DefaultSidebar() {
  return (
    <nav>
      <ul className={styles.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={styles.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={styles.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
