// ✅ FILE: app/notes/filter/[...slug]/layout.tsx

import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  modal: ReactNode;
  sidebar: ReactNode;
}

export default function Layout({ children, modal, sidebar }: LayoutProps) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px" }}>{sidebar}</aside>
      <main style={{ flex: 1 }}>
        {children}
        {modal}
      </main>
    </div>
  );
}
