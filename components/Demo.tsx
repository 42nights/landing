"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Channel = "slack" | "imessage" | "whatsapp";
type Mode = "onboarding" | "ops";
type Phase = "idle" | "playing" | "awaiting" | "done";

const liveOpsMessages = [
  "Daniel hasn't pushed a PR in 4 days. No documented blocker. Should I check in?",
  "Sourced 3 quotes for new dev tooling. Vendor B is 22% cheaper, same SLA. Want me to negotiate further?",
  "Maya's calendar is fully booked. I rescheduled her recurring 1:1 with Anika to Thursday — both confirmed.",
];

type Beat = {
  who: "agent" | "you";
  meta: string;
  text: string;
};

const onboardingScript: Beat[] = [
  {
    who: "agent",
    meta: "Day 1 · Embed",
    text:
      "Forward-deployed today. I'm sitting in #engineering and #ops. Watching how PRs flow through review and how vendor calls get scheduled. I'll stay quiet for the first week.",
  },
  {
    who: "you",
    meta: "Ayaan",
    text: "Sounds good. Daniel's leading review. Maya owns vendor pipeline.",
  },
  {
    who: "agent",
    meta: "Day 3 · Embed",
    text:
      "Mapped your procurement surface: Linear, Sentry, Vercel renewing this quarter. Pulling 12 months of vendor history and your last 3 contract negotiations.",
  },
  {
    who: "agent",
    meta: "Day 6 · Train",
    text:
      "Trained on 412 Slack threads, 87 PRs, 14 vendor calls. I can now answer \"who's blocked\" and \"what's stalled\" without asking. Want me to demo before going live?",
  },
  {
    who: "you",
    meta: "Ayaan",
    text: "Yes — show me a stalled PR.",
  },
  {
    who: "agent",
    meta: "Day 6 · Train",
    text:
      "Daniel's PR #482 is 4 days idle. CI green. No reviewer assigned. Pattern matches 11 prior stalls — usually a quiet review-load issue. I'd ping Maya. Sound right?",
  },
  {
    who: "you",
    meta: "Ayaan",
    text: "Right. Approved.",
  },
  {
    who: "agent",
    meta: "Day 14 · Ship",
    text:
      "Ready to ship. I'll act with permission on: PR triage, vendor scheduling, procurement up to $20k/mo on the spend card. Voice routes through Vapi. I'll log every action to #engineering-ops. Approve to go live?",
  },
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
  const [channel, setChannel] = useState<Channel>("slack");
  const [mode, setMode] = useState<Mode>("onboarding");
  const [phase, setPhase] = useState<Phase>("idle");
  const [visible, setVisible] = useState(0);
  const [final, setFinal] = useState<string | null>(null);

  const total = mode === "onboarding" ? onboardingScript.length : liveOpsMessages.length;

  useEffect(() => {
    if (phase !== "playing") return;
    if (visible >= total) {
      setPhase("awaiting");
      return;
    }
    const t = setTimeout(() => setVisible((v) => v + 1), mode === "onboarding" ? 1100 : 800);
    return () => clearTimeout(t);
  }, [phase, visible, total, mode]);

  function start() {
    if (phase !== "idle") return;
    setPhase("playing");
    setVisible(1);
  }

  function approve() {
    if (mode === "onboarding") {
      setFinal(
        "Live. I'll start with PR triage and vendor calls today. You'll see the next prompt when something needs your call.",
      );
    } else {
      setFinal("Done. Logged to #engineering-ops. Want to see the weekly digest?");
    }
    setPhase("done");
  }

  function reset(newMode?: Mode) {
    setPhase("idle");
    setVisible(0);
    setFinal(null);
    if (newMode) setMode(newMode);
  }

  return (
    <section id="demo" className="border-t border-black/5 scroll-mt-16">
      <div className="mx-auto max-w-page px-6 py-24 md:px-10 md:py-32">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.15em] text-mutedSoft">
            Live demo
          </div>
          <h2 className="mt-3 font-serif-display text-3xl leading-tight tracking-tight md:text-5xl">
            What the agent does, in your stack.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            Pick a channel and a phase. The conversation below is hardcoded —
            but every beat mirrors a real forward-deployed engagement.
          </p>
        </div>

        {/* Mode toggle + channel pills row */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-md border border-black/15 bg-white p-1">
            <ModeButton
              active={mode === "onboarding"}
              onClick={() => reset("onboarding")}
              label="Onboarding session"
              sub="Weeks 1–4"
            />
            <ModeButton
              active={mode === "ops"}
              onClick={() => reset("ops")}
              label="Live operations"
              sub="Post-ship"
            />
          </div>
          <ChannelPills channel={channel} setChannel={setChannel} />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:gap-6">
          {/* Workflow panel */}
          <div className="rounded-lg border border-black/15 bg-white">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
              <div className="text-sm font-medium">Workflow</div>
              <div className="text-xs text-mutedSoft">
                {mode === "onboarding" ? "shadowing" : "today"}
              </div>
            </div>
            <div className="space-y-4 p-5">
              <Card title="Pull Request Activity" subtitle="last 24h">
                <ul className="divide-y divide-black/5 text-sm">
                  {prActivity.map((p) => (
                    <li key={p.name} className="flex items-center justify-between py-2">
                      <span>{p.name}</span>
                      <span
                        className={
                          p.status === "stalled" ? "text-accent" : "text-ink/70"
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
                    <li key={v.vendor} className="flex items-center justify-between py-2">
                      <span>{v.vendor}</span>
                      <span className="text-ink/70">{v.when}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="Procurement Decisions Pending Approval">
                <ul className="divide-y divide-black/5 text-sm">
                  {procurement.map((p) => (
                    <li key={p.item} className="flex items-center justify-between py-2">
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
                  <div className="h-full rounded-full bg-ink" style={{ width: "42%" }} />
                </div>
              </Card>
            </div>
          </div>

          {/* Chat panel — channel-specific chrome */}
          <ChatPanel
            channel={channel}
            mode={mode}
            phase={phase}
            visible={visible}
            final={final}
            onStart={start}
            onApprove={approve}
            onReset={() => reset()}
            onSkipToOps={() => reset("ops")}
          />
        </div>

        <p className="mt-6 max-w-3xl text-sm italic text-mutedSoft">
          This is a hardcoded demo. The real agent ships with your company's
          actual data, integrated with Slack, iMessage, WhatsApp, voice (Vapi),
          code repos, and a permissioned spend card.
        </p>
      </div>
    </section>
  );
}

function ModeButton({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-4 py-2 text-left text-sm transition-colors ${
        active ? "bg-ink text-white" : "text-ink hover:bg-black/5"
      }`}
    >
      <div className="font-medium leading-tight">{label}</div>
      <div className={`text-[11px] ${active ? "text-white/70" : "text-mutedSoft"}`}>
        {sub}
      </div>
    </button>
  );
}

function ChannelPills({
  channel,
  setChannel,
}: {
  channel: Channel;
  setChannel: (c: Channel) => void;
}) {
  const tabs: { id: Channel; label: string }[] = [
    { id: "slack", label: "Slack" },
    { id: "imessage", label: "iMessage" },
    { id: "whatsapp", label: "WhatsApp" },
  ];
  return (
    <div className="inline-flex rounded-md border border-black/15 bg-white p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setChannel(t.id)}
          className={`rounded-md px-3 py-2 text-xs transition-colors ${
            channel === t.id ? "bg-ink text-white" : "text-ink/70 hover:bg-black/5"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

type ChatPanelProps = {
  channel: Channel;
  mode: Mode;
  phase: Phase;
  visible: number;
  final: string | null;
  onStart: () => void;
  onApprove: () => void;
  onReset: () => void;
  onSkipToOps: () => void;
};

function ChatPanel(props: ChatPanelProps) {
  if (props.channel === "imessage") return <ImessagePanel {...props} />;
  if (props.channel === "whatsapp") return <WhatsappPanel {...props} />;
  return <SlackPanel {...props} />;
}

/* ----------------- Slack ----------------- */

function SlackPanel({
  mode,
  phase,
  visible,
  final,
  onStart,
  onApprove,
  onReset,
  onSkipToOps,
}: ChatPanelProps) {
  const channelName = mode === "onboarding" ? "42n-onboarding" : "engineering-ops";
  return (
    <div className="flex min-h-[640px] flex-col overflow-hidden rounded-lg border border-black/15 bg-white">
      <div className="flex items-center justify-between border-b border-black/10 bg-[#F8F8F8] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-serif-display text-base text-ink">#</span>
          <span className="text-sm font-semibold text-ink">{channelName}</span>
          <span className="text-xs text-mutedSoft">· 4 members</span>
        </div>
        <div className="text-xs text-mutedSoft">Slack</div>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-white p-5">
        {mode === "ops" && (
          <SlackMessage who="42nights agent" time="9:42 AM" agent>
            Hi — I noticed something you might want to see.
          </SlackMessage>
        )}
        {mode === "onboarding" && (
          <SlackMessage who="42nights agent" time="Day 0 · 9:00 AM" agent>
            Hello. I'm your forward-deployed agent. Starting a 2–4 week embed
            today. I'll observe before I act.
          </SlackMessage>
        )}

        <AnimatePresence>
          {(mode === "onboarding"
            ? onboardingScript.slice(0, visible)
            : liveOpsMessages.slice(0, visible).map((t) => ({
                who: "agent" as const,
                meta: "9:42 AM",
                text: t,
              }))
          ).map((b, i) => (
            <motion.div
              key={`s-${mode}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <SlackMessage
                who={b.who === "agent" ? "42nights agent" : "Ayaan G."}
                time={b.meta}
                agent={b.who === "agent"}
              >
                {b.text}
              </SlackMessage>
            </motion.div>
          ))}
        </AnimatePresence>

        {phase === "awaiting" && (
          <ApproveButtons mode={mode} onApprove={onApprove} onSkipToOps={onSkipToOps} />
        )}

        {final && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <SlackMessage who="42nights agent" time="just now" agent>
              {final}
            </SlackMessage>
          </motion.div>
        )}
      </div>

      <ControlBar phase={phase} mode={mode} onStart={onStart} onReset={onReset} />
    </div>
  );
}

function SlackMessage({
  who,
  time,
  agent,
  children,
}: {
  who: string;
  time: string;
  agent?: boolean;
  children: React.ReactNode;
}) {
  const initial = who.charAt(0);
  return (
    <div className="flex gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-sm font-semibold text-white ${
          agent ? "bg-accent" : "bg-ink"
        }`}
      >
        {initial}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-ink">{who}</span>
          {agent && (
            <span className="rounded-sm bg-black/10 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink/70">
              APP
            </span>
          )}
          <span className="text-xs text-mutedSoft">{time}</span>
        </div>
        <div className="mt-0.5 text-sm leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  );
}

/* ----------------- iMessage ----------------- */

function ImessagePanel({
  mode,
  phase,
  visible,
  final,
  onStart,
  onApprove,
  onReset,
  onSkipToOps,
}: ChatPanelProps) {
  const beats =
    mode === "onboarding"
      ? onboardingScript.slice(0, visible)
      : liveOpsMessages.slice(0, visible).map((t) => ({
          who: "agent" as const,
          meta: "",
          text: t,
        }));

  return (
    <div className="flex min-h-[640px] flex-col overflow-hidden rounded-[20px] border border-black/15 bg-white">
      {/* iMessage status bar + contact header */}
      <div className="border-b border-black/10 bg-[#F6F6F6]">
        <div className="flex items-center justify-between px-4 pt-2 text-[11px] font-semibold text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span>•••</span>
            <span>5G</span>
            <span>▮</span>
          </span>
        </div>
        <div className="flex flex-col items-center pb-3 pt-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
            42
          </div>
          <div className="mt-1 text-[11px] font-medium text-ink">42nights agent</div>
          <div className="text-[10px] text-mutedSoft">iMessage</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto bg-white px-4 py-4">
        <ImessageDayDivider label="Today 9:00 AM" />

        {mode === "onboarding" && (
          <ImessageBubble side="left">
            Hello. I'm your forward-deployed agent. Starting a 2–4 week embed
            today. I'll observe before I act.
          </ImessageBubble>
        )}
        {mode === "ops" && (
          <ImessageBubble side="left">
            Hi — I noticed something you might want to see.
          </ImessageBubble>
        )}

        <AnimatePresence>
          {beats.map((b, i) => (
            <motion.div
              key={`im-${mode}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ImessageBubble side={b.who === "you" ? "right" : "left"} meta={b.meta}>
                {b.text}
              </ImessageBubble>
            </motion.div>
          ))}
        </AnimatePresence>

        {phase === "awaiting" && (
          <div className="pt-2">
            <ApproveButtons mode={mode} onApprove={onApprove} onSkipToOps={onSkipToOps} />
          </div>
        )}

        {final && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ImessageBubble side="left">{final}</ImessageBubble>
          </motion.div>
        )}

        {phase === "done" && (
          <div className="mt-1 text-right text-[10px] text-mutedSoft">Delivered</div>
        )}
      </div>

      {/* iMessage compose */}
      <div className="border-t border-black/10 bg-[#F6F6F6] px-3 py-2">
        <div className="flex items-center gap-2 rounded-full border border-black/20 bg-white px-3 py-2">
          <span className="text-mutedSoft">+</span>
          <span className="flex-1 text-[11px] text-mutedSoft">iMessage</span>
          <span className="rounded-full bg-[#0A84FF] px-2 py-0.5 text-[10px] text-white">↑</span>
        </div>
      </div>

      <ControlBar phase={phase} mode={mode} onStart={onStart} onReset={onReset} />
    </div>
  );
}

function ImessageDayDivider({ label }: { label: string }) {
  return (
    <div className="my-2 text-center text-[10px] font-medium text-mutedSoft">
      {label}
    </div>
  );
}

function ImessageBubble({
  side,
  meta,
  children,
}: {
  side: "left" | "right";
  meta?: string;
  children: React.ReactNode;
}) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"} my-0.5`}>
      <div className="flex max-w-[78%] flex-col">
        {meta && (
          <div
            className={`mb-0.5 text-[10px] text-mutedSoft ${isRight ? "text-right" : "text-left"}`}
          >
            {meta}
          </div>
        )}
        <div className="relative">
          <div
            className={`px-3.5 py-2 text-[14px] leading-snug ${
              isRight
                ? "rounded-[18px] rounded-br-[4px] bg-[#0A84FF] text-white"
                : "rounded-[18px] rounded-bl-[4px] bg-[#E5E5EA] text-ink"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- WhatsApp ----------------- */

function WhatsappPanel({
  mode,
  phase,
  visible,
  final,
  onStart,
  onApprove,
  onReset,
  onSkipToOps,
}: ChatPanelProps) {
  const beats =
    mode === "onboarding"
      ? onboardingScript.slice(0, visible)
      : liveOpsMessages.slice(0, visible).map((t) => ({
          who: "agent" as const,
          meta: "",
          text: t,
        }));

  // Tan WhatsApp wallpaper using subtle SVG dots
  const wallpaperBg = {
    background:
      "#E5DDD5 url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><circle cx='4' cy='4' r='1' fill='%23d3c5b8' opacity='0.4'/></svg>\")",
  };

  return (
    <div className="flex min-h-[640px] flex-col overflow-hidden rounded-lg border border-black/15 bg-white">
      {/* WhatsApp top bar */}
      <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
        <span className="text-lg">‹</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#128C7E] text-sm font-semibold">
          42
        </div>
        <div className="flex flex-1 flex-col leading-tight">
          <span className="text-sm font-semibold">42nights agent</span>
          <span className="text-[11px] text-white/80">online</span>
        </div>
        <div className="flex items-center gap-3 text-white/90">
          <span className="text-base">📞</span>
          <span className="text-base">⋮</span>
        </div>
      </div>

      {/* Messages on wallpaper */}
      <div
        className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-3"
        style={wallpaperBg}
      >
        <div className="my-2 text-center">
          <span className="rounded-md bg-white/85 px-2 py-1 text-[10px] font-medium text-ink/70">
            TODAY
          </span>
        </div>

        {mode === "onboarding" && (
          <WhatsappBubble side="left" time="9:00">
            Hello. I'm your forward-deployed agent. Starting a 2–4 week embed
            today. I'll observe before I act.
          </WhatsappBubble>
        )}
        {mode === "ops" && (
          <WhatsappBubble side="left" time="9:42">
            Hi — I noticed something you might want to see.
          </WhatsappBubble>
        )}

        <AnimatePresence>
          {beats.map((b, i) => (
            <motion.div
              key={`wa-${mode}-${i}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WhatsappBubble
                side={b.who === "you" ? "right" : "left"}
                time={timeFromMeta(b.meta, i)}
                read={b.who === "you"}
              >
                {b.text}
              </WhatsappBubble>
            </motion.div>
          ))}
        </AnimatePresence>

        {phase === "awaiting" && (
          <div className="pt-2">
            <ApproveButtons mode={mode} onApprove={onApprove} onSkipToOps={onSkipToOps} />
          </div>
        )}

        {final && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WhatsappBubble side="left" time="now">
              {final}
            </WhatsappBubble>
          </motion.div>
        )}
      </div>

      {/* Compose */}
      <div className="flex items-center gap-2 bg-[#F0F0F0] px-3 py-2">
        <span className="text-base text-mutedSoft">😊</span>
        <div className="flex-1 rounded-full bg-white px-3 py-2 text-[11px] text-mutedSoft">
          Type a message
        </div>
        <span className="text-base text-mutedSoft">📎</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#128C7E] text-white">
          🎤
        </div>
      </div>

      <ControlBar phase={phase} mode={mode} onStart={onStart} onReset={onReset} />
    </div>
  );
}

function timeFromMeta(_meta: string, i: number) {
  const base = 9 * 60 + (i + 1) * 7;
  const h = Math.floor(base / 60) % 24;
  const m = base % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
}

function WhatsappBubble({
  side,
  time,
  read,
  children,
}: {
  side: "left" | "right";
  time: string;
  read?: boolean;
  children: React.ReactNode;
}) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"} my-0.5`}>
      <div
        className={`relative max-w-[80%] rounded-md px-3 py-2 text-[14px] leading-snug shadow-sm ${
          isRight ? "bg-[#DCF8C6] text-ink" : "bg-white text-ink"
        }`}
      >
        <div>{children}</div>
        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-ink/55">
          <span>{time}</span>
          {isRight && (
            <span className={read ? "text-[#34B7F1]" : "text-ink/55"}>✓✓</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------- Shared ----------------- */

function ApproveButtons({
  mode,
  onApprove,
  onSkipToOps,
}: {
  mode: Mode;
  onApprove: () => void;
  onSkipToOps: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap gap-2 pt-1"
    >
      {mode === "onboarding" ? (
        <>
          <button
            onClick={onApprove}
            className="rounded-md border border-ink bg-ink px-4 py-2 text-sm text-white hover:bg-white hover:text-ink"
          >
            Approve — go live
          </button>
          <button
            onClick={onSkipToOps}
            className="rounded-md border border-ink bg-white px-4 py-2 text-sm text-ink hover:bg-ink hover:text-white"
          >
            Skip to live ops
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onApprove}
            className="rounded-md border border-ink bg-ink px-4 py-2 text-sm text-white hover:bg-white hover:text-ink"
          >
            Approve all
          </button>
          <button
            onClick={onApprove}
            className="rounded-md border border-ink bg-white px-4 py-2 text-sm text-ink hover:bg-ink hover:text-white"
          >
            Review individually
          </button>
        </>
      )}
    </motion.div>
  );
}

function ControlBar({
  phase,
  mode,
  onStart,
  onReset,
}: {
  phase: Phase;
  mode: Mode;
  onStart: () => void;
  onReset: () => void;
}) {
  return (
    <div className="border-t border-black/10 bg-white px-5 py-3">
      {phase === "idle" && (
        <button
          onClick={onStart}
          className="w-full rounded-md border border-ink bg-ink px-4 py-3 text-sm font-medium text-white animate-pulse-ring"
        >
          {mode === "onboarding"
            ? "Walk me through the embed"
            : "Show me what the agent caught today"}
        </button>
      )}
      {phase !== "idle" && (
        <button
          onClick={onReset}
          className="text-xs text-mutedSoft underline-offset-4 hover:text-ink hover:underline"
        >
          ↻ replay demo
        </button>
      )}
    </div>
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
        {subtitle && <div className="text-xs text-mutedSoft">{subtitle}</div>}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
