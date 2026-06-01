// Live agent activity ticker — believable agent actions scrolling left on an
// infinite loop, edge-faded. Pure CSS marquee (animate-marquee-left + duplicated
// track for a seamless wrap). Themed via tokens, so it reads in dark and light.
const ACTIONS = [
  "Negotiating renewal with Notion — $1,400/mo saved",
  "Triaging PR #2847 — assigning reviewer",
  "Scheduled vendor call: Datadog, Thu 3pm",
  "Flagged: Daniel hasn't pushed in 4 days, no documented blocker",
  "Drafted reply to Vercel billing — awaiting approval",
  "Rescheduled Maya's 1:1 — calendar conflict resolved",
  "Cancelled a duplicate Figma seat — $45/mo",
  "Sourced 3 quotes for dev tooling — Vendor B 22% cheaper",
  "Closed a stale Linear ticket — no activity in 21 days",
];

export function ActivityTicker() {
  return (
    <div
      className="marquee-mask overflow-hidden border-y border-cream/10 py-3"
      aria-hidden
    >
      <div className="flex w-max animate-marquee-left items-center motion-reduce:animate-none">
        {[...ACTIONS, ...ACTIONS].map((t, i) => (
          <span
            key={i}
            className="mx-5 inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-[13px] text-cream/70"
          >
            <span className="text-accent">→</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
