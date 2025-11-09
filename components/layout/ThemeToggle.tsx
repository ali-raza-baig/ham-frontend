"use client";
import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
import { createContext, useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function ThemeToggleButton() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="p-2 rounded-full border hover:bg-muted"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
