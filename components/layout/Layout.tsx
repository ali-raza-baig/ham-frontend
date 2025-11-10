'use client'
import "./globals.css";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";


export const metadata = { title: "Power Monitor Dashboard" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-background text-foreground flex">

                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <Navbar />
                    {children}
                </main>
            </body>
        </html>
    );
}
