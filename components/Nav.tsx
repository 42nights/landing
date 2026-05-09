import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Nav() {
  return (
    <nav className="w-full border-b border-black/5">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="text-xl tracking-tight">
          <Wordmark />
        </Link>
        {/* TODO: replace placeholder cal.com link before launch */}
        <a
          href="https://cal.com/42nights"
          className="rounded-md border border-ink bg-ink px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-ink"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
