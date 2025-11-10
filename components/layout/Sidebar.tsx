"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, Clock, BarChart3 } from "lucide-react";
import clsx from "clsx";

const nav = [
  { href: "/", label: "Dashboard", icon: Gauge },
  { href: "/history", label: "History", icon: Clock },
  { href: "/charts", label: "Charts", icon: BarChart3 },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const path = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-muted/20 border-r border-border">
        <div className="p-4 text-xl font-bold">⚡ Power Monitor</div>
        <nav className="flex flex-col gap-1 p-2">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition",
                path === href && "bg-primary/10 text-primary font-medium"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </aside>


    </>
  );
}
