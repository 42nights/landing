export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif-display ${className}`}>
      42nights<span className="text-accent">.</span>
    </span>
  );
}
