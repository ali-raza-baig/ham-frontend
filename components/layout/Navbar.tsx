"use client";

import { ThemeToggleButton } from "./ThemeToggle";


export function Navbar() {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <ThemeToggleButton />
    </header>
  );
}
