"use client";

import { ChartNoAxesGantt, X } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggle";
import { useState } from "react";
import { Button } from "../ui/button";
import { Gauge, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const nav = [
  { href: "/", label: "Dashboard", icon: Gauge },
  { href: "/history", label: "History", icon: Clock },
  { href: "/charts", label: "Charts", icon: BarChart3 },
];

export function Navbar() {
  const [open, setOpen] = useState(false); // start closed

  return (
    <>
      <header className="flex justify-between items-center mb-6 relative ">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2 flex-row-reverse">
          <Button
            className="block md:hidden py-1 rounded-[50%] border hover:bg-muted z-50 relative"
            variant="ghost"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <ChartNoAxesGantt />}
          </Button>
          <ThemeToggleButton />
        </div>
      </header>

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed inset-0 md:hidden transition-transform duration-300 pointer-events-none ${
          open ? "pointer-events-auto" : ""
        }`}
      >


        {/* Sidebar content */}
        <aside
          className={`relative flex flex-col w-56 h-full bg-white border-r border-border z-50 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 text-xl font-bold">⚡ Power Monitor</div>
          <nav className="flex flex-col gap-1 p-2">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)} // closes sidebar when clicked
                className={clsx(
                  "flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
