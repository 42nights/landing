"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Phase = "idle" | "playing" | "awaiting" | "done";

const agentMessages = [
  "Daniel hasn't pushed a PR in 4 days. No documented blocker. Should I check in?",
  "Sourced 3 quotes for new dev tooling. Vendor B is 22% cheaper, same SLA. Want me to negotiate further?",
  "Maya's calendar is fully booked. I rescheduled her recurring 1:1 with Anika to Thursday — both confirmed.",
];

const prActivity = [
  { name: "Daniel R.", count: 0, status: "stalled" },
  { name: "Maya O.", count: 3, status: "active" },
  { name: "Jordan P.", count: 5, status: "active" },
  { name: "Anika S.", count: 2, status: "active" },
];

const vendorCalls = [
  { vendor: "Linear", when: "Tue 2:30p" },
  { vendor: "Sentry", when: "Wed 11:00a" },
  { vendor: "Vercel", when: "Thu 4:00p" },
];

const procurement = [
  { item: "Linear Plus seats × 12", amount: "$1,440 / mo" },
  { item: "Datadog APM upgrade", amount: "$2,100 / mo" },
];

export function Demo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visible, setVisible] = useState(0);
  const [final, setFinal] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== "playing") return;
    if (visible >= agentMessages.length) {
      setPhase("awaiting");
      return;
    }
    const t = setTimeout(() => setVisible((v) => v + 1), 800);
    return () => clearTimeout(t);
  }, [phase, visible]);

  function start() {
    if (phase !== "idle") return;
    setPhase("playing");
    setVisible(1);
  }

  function approve(label: string) {
    setFinal(`Done. Logged to #engineering-ops. Want to see the weekly digest?`);
    setPhase("done");
  }

  function reset() {
    setPhase("idle");
    setVisible(0);
    setFinal(null);
  }

  return (
    <section
      id="demo"
      className="border-t border-black/5 scroll-mt-16"
    >
      <div className="mx-auto max-w-page px-6 py-24 md:px-10 md:py-32">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.15em] text-mutedSoft">
            Live demo
          </div>
          <h2 className="mt-3 font-serif-display text-3xl leading-tight tracking-tight md:text-5xl">
            What the agent does, in your stack.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:gap-6">
          {/* Workflow panel */}
          <div className="rounded-lg border border-black/15 bg-white">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
              <div className="text-sm font-medium">Workflow</div>
              <div className="text-xs text-mutedSoft">today</div>
            </div>
            <div className="space-y-4 p-5">
              <Card title="Pull Request Activity" subtitle="last 24h">
                <ul className="divide-y divide-black/5 text-sm">
                  {prActivity.map((p) => (
                    <li
                      key={p.name}
                      className="flex items-center justify-between py-2"
                    >
                      <span>{p.name}</span>
                      <span
                        className={
                          p.status === "stalled"
                            ? "text-accent"
                            : "text-ink/70"
                        }
                      >
                        {p.count} PRs
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="Vendor Calls Scheduled This Week">
                <ul className="divide-y divide-black/5 text-sm">
                  {vendorCalls.map((v) => (
                    <li
                      key={v.vendor}
                      className="flex items-center justify-between py-2"
                    >
                      <span>{v.vendor}</span>
                      <span className="text-ink/70">{v.when}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="Procurement Decisions Pending Approval">
                <ul className="divide-y divide-black/5 text-sm">
                  {procurement.map((p) => (
                    <li
                      key={p.item}
                      className="flex items-center justify-between py-2"
                    >
                      <span>{p.item}</span>
                      <span className="text-ink/70">{p.amount}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="Spend This Month / Budget Remaining">
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="font-serif-display text-2xl">$8,420</span>
                  <span className="text-sm text-ink/70">of $20,000</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full bg-ink"
                    style={{ width: "42%" }}
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Agent feed */}
          <div className="flex min-h-[560px] flex-col rounded-lg border border-black/15 bg-white">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Agent activity feed
              </div>
              <div className="text-xs text-mutedSoft">#engineering-ops</div>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <Bubble>Hi — I noticed something you might want to see.</Bubble>

              <AnimatePresence>
                {agentMessages.slice(0, visible).map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Bubble>{m}</Bubble>
                  </motion.div>
                ))}
              </AnimatePresence>

              {phase === "awaiting" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  <button
                    onClick={() => approve("all")}
                    className="rounded-md border border-ink bg-ink px-4 py-2 text-sm text-white hover:bg-white hover:text-ink"
                  >
                    Approve all
                  </button>
                  <button
                    onClick={() => approve("review")}
                    className="rounded-md border border-ink bg-white px-4 py-2 text-sm text-ink hover:bg-ink hover:text-white"
                  >
                    Review individually
                  </button>
                </motion.div>
              )}

              {final && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Bubble>{final}</Bubble>
                </motion.div>
              )}

              <div className="mt-auto pt-4">
                {phase === "idle" && (
                  <button
                    onClick={start}
                    className="w-full rounded-md border border-ink bg-ink px-4 py-3 text-sm font-medium text-white animate-pulse-ring"
                  >
                    Show me what the agent caught today
                  </button>
                )}
                {phase !== "idle" && (
                  <button
                    onClick={reset}
                    className="text-xs text-mutedSoft underline-offset-4 hover:text-ink hover:underline"
                  >
                    ↻ replay demo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm italic text-mutedSoft">
          This is a hardcoded demo. The real agent ships with your company's
          actual data, integrated with Slack, code repos, voice, and a
          permissioned spend card.
        </p>
      </div>
    </section>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-black/10 p-4">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-medium">{title}</div>
        {subtitle && (
          <div className="text-xs text-mutedSoft">{subtitle}</div>
        )}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[92%] rounded-md border border-black/10 bg-cream px-4 py-3 text-sm leading-relaxed text-ink">
      {children}
    </div>
  );
}
