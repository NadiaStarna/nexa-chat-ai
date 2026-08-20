import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { DevBanner } from "./DevBanner";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <DevBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}