import { ProjectConfig } from "@/components/compose/project-config";
import { Link } from "@/components/link";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import "@/layouts/tailwind.css";
import type { ReactNode } from "react";

export default function LayoutDefault({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative min-h-screen overflow-hidden">
        <Navbar />
        {children}
      </div>
    </ThemeProvider>
  );
}

function Navbar() {
  return (
    <div className="z-50 flex h-16 items-center border-b bg-background px-4">
      <Link href="/">Home</Link>
      <div className="ml-auto flex gap-2">
        <ProjectConfig />
        <ModeToggle />
      </div>
    </div>
  );
}
