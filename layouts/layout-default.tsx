import { Link } from "@/components/link";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import "@/layouts/tailwind.css";
import type { ReactNode } from "react";

export default function LayoutDefault({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col">
        <Navbar>
          <Link href="/">Home</Link>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </Navbar>
        <Content>{children}</Content>
      </div>
    </ThemeProvider>
  );
}

function Navbar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky top-0 z-50 flex border-b bg-background p-4">
      {children}
    </div>
  );
}

function Content({ children }: { children: ReactNode }) {
  return <div className="flex-1 p-4">{children}</div>;
}
