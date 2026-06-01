import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";

// Top-of-page header: full-width, in normal flow (scrolls away with the page).
// The floating pill (<FloatingNav/>) takes over once you scroll down.
export function Nav() {
  return (
    <header className="relative z-40 mx-auto flex w-full max-w-page items-center justify-between px-6 py-6 md:px-10">
      <Link href="/" className="text-xl tracking-tight">
        <Wordmark />
      </Link>
      <div className="flex items-center gap-2.5">
        <ThemeToggle />
        {/* TODO: replace placeholder cal.com link before launch */}
        <a
          href="https://cal.com/42nights"
          className="btn-press rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accentBright"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}
