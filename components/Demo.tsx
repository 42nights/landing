"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { Reveal } from "@/components/motion/Reveal";

type Channel = "slack" | "imessage" | "whatsapp";
type Mode = "onboarding" | "ops";

// Keeps a scroll container pinned to the bottom as messages stream in.
function useAutoScroll(deps: unknown[]) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = requestAnimationFrame(() =>
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }),
    );
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

const liveOpsMessages = [
  "Billing service throughput dropped 12% after last night's deploy. Root-caused to a query regression, patched and shipped to your VPC. Want the diff?",
  "Your Stripe replacement passed all 1,284 regression tests against this week's frontier-model upgrade. Inherited the gains, zero re-implementation.",
  "Found a dead code path in the legacy reporting rebuild. Removed it, added a test, redeployed. Logged.",
];

type Beat = {
  who: "agent" | "you";
  meta: string;
  text: string;
};

const onboardingScript: Beat[] = [
  {
    who: "agent",
    meta: "Day 1 · Connect",
    text: "Connected to your stack today, mapping the SaaS and internal systems you run on. I'll learn how billing, auth, and reporting actually work before I rebuild anything.",
  },
  {
    who: "you",
    meta: "Jerry",
    text: "Sounds good. Billing's our biggest vendor pain. Reporting's a legacy mess.",
  },
  {
    who: "agent",
    meta: "Day 4 · Map",
    text: "Mapped 480 endpoints across your billing vendor and the legacy reporting DB. 86% reverse-engineered. Pulling the contracts and undocumented schemas now.",
  },
  {
    who: "agent",
    meta: "Day 9 · Rebuild",
    text: "Rebuilt billing and auth as services running in your VPC, source is yours. Closed loop is running: 1,284 tests, 9 patches, 3 regressions caught and fixed automatically.",
  },
  {
    who: "you",
    meta: "Jerry",
    text: "Right. Cut over reporting next.",
  },
  {
    who: "agent",
    meta: "Day 14 · Deploy",
    text: "Live on your infra under a self-evolving harness: monitor, test, patch, improve — no vendor in the loop. Every change logged to #engineering-ops.",
  },
];

// The reel: one chat at a time, rotating channels AND phases. Each segment
// streams to completion, holds, then the next takes over — no controls.
const PLAYLIST: { channel: Channel; mode: Mode }[] = [
  { channel: "slack", mode: "onboarding" },
  { channel: "imessage", mode: "ops" },
  { channel: "whatsapp", mode: "onboarding" },
  { channel: "slack", mode: "ops" },
];

export function Demo() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(1);
  const { channel, mode } = PLAYLIST[step];
  const total =
    mode === "onboarding" ? onboardingScript.length : liveOpsMessages.length;

  // Stream the current segment, then hold and advance to the next channel/phase.
  // Loops forever.
  useEffect(() => {
    if (visible < total) {
      const t = setTimeout(
        () => setVisible((v) => v + 1),
        mode === "onboarding" ? 1100 : 950,
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStep((s) => (s + 1) % PLAYLIST.length);
      setVisible(1);
    }, 2800);
    return () => clearTimeout(t);
  }, [visible, total, mode]);

  return (
    <section id="demo" className="scroll-mt-16">
      <div className="mx-auto max-w-page px-6 py-28 md:px-10 md:py-40">
        <Reveal as="div" stagger={0.08} className="max-w-2xl">
          <div className="font-mono-label text-[11px] text-cream/45">
            Live demo
          </div>
          <h2 className="mt-6 font-serif-display leading-[1.02] tracking-[-0.02em] text-cream text-[clamp(34px,5vw,68px)]">
            The agents that build and run it.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-cream/70 md:mt-6 md:text-xl">
            It runs where your team already works — Slack, iMessage, WhatsApp —
            streaming through the build and the closed loop. Nothing to click.
          </p>
        </Reveal>

        <Reveal
          as="div"
          y={24}
          start="top 85%"
          className="mt-12 flex justify-center"
        >
          <div className="w-full max-w-xl">
            {/* Remount per segment so the stream restarts cleanly. */}
            <ChatPanel
              key={step}
              channel={channel}
              mode={mode}
              visible={visible}
            />
          </div>
        </Reveal>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm italic text-cream/45">
          Hardcoded demo. The real agents work on your company&apos;s actual
          systems — reverse-engineering your SaaS, rebuilding it in your VPC,
          and running a closed loop that maintains it in place.
        </p>
      </div>
    </section>
  );
}

/**
 * BubbleIn: GSAP message-entrance. Each rendered bubble has a stable unique key,
 * so it mounts fresh as the stream advances. A scoped useGSAP runs once on mount
 * and fades the node up. Reduced motion shows it statically.
 */
function BubbleIn({ y = 8, children }: { y?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { clearProps: "all", opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          y,
          autoAlpha: 0,
          scale: 0.985,
          transformOrigin: "left center",
          duration: 0.35,
          ease: "power3.out",
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}

// The 42nights agent avatar — the site favicon.
function AgentAvatar({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span className={`shrink-0 overflow-hidden ${className}`}>
      <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden="true">
        <rect width="32" height="32" fill="#0A0A0A" />
        <circle cx="16" cy="16" r="5" fill="#D72638" />
      </svg>
    </span>
  );
}

type PanelProps = { mode: Mode; visible: number };

function ChatPanel({
  channel,
  mode,
  visible,
}: {
  channel: Channel;
  mode: Mode;
  visible: number;
}) {
  if (channel === "imessage")
    return <ImessagePanel mode={mode} visible={visible} />;
  if (channel === "whatsapp")
    return <WhatsappPanel mode={mode} visible={visible} />;
  return <SlackPanel mode={mode} visible={visible} />;
}

// Normalize a segment into a list of beats up to `visible`.
function beatsFor(mode: Mode, visible: number): Beat[] {
  return mode === "onboarding"
    ? onboardingScript.slice(0, visible)
    : liveOpsMessages.slice(0, visible).map((t) => ({
        who: "agent" as const,
        meta: "9:42 AM",
        text: t,
      }));
}

/* ----------------- Slack ----------------- */

function SlackPanel({ mode, visible }: PanelProps) {
  const channelName = mode === "onboarding" ? "42n-build" : "engineering-ops";
  const scrollRef = useAutoScroll([visible]);
  const beats = beatsFor(mode, visible);
  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-cream/15 bg-surface">
      <div className="flex h-16 items-center justify-between border-b border-cream/15 bg-surface2 px-5">
        <div className="flex items-center gap-2">
          <span className="font-serif-display text-base text-cream/45">#</span>
          <span className="text-sm font-semibold text-cream">
            {channelName}
          </span>
          <span className="text-xs text-cream/40">· 4 members</span>
        </div>
        <div className="font-mono-label text-[10px] text-cream/40">Slack</div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-5"
      >
        {beats.map((b, i) => (
          <BubbleIn key={`s-${mode}-${i}`}>
            <SlackMessage
              who={b.who === "agent" ? "42nights agent" : "Jerry X."}
              time={b.meta}
              agent={b.who === "agent"}
            >
              {b.text}
            </SlackMessage>
          </BubbleIn>
        ))}
      </div>
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
  return (
    <div className="flex gap-3">
      {agent ? (
        <AgentAvatar />
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-cream/10 text-sm font-semibold text-cream">
          {who.charAt(0)}
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-cream">{who}</span>
          {agent && (
            <span className="bg-cream/10 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wide text-cream/55">
              APP
            </span>
          )}
          <span className="text-xs text-cream/40">{time}</span>
        </div>
        <div className="mt-0.5 text-sm leading-relaxed text-cream/80">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ----------------- iMessage ----------------- */

function ImessagePanel({ mode, visible }: PanelProps) {
  const beats = beatsFor(mode, visible);
  const scrollRef = useAutoScroll([visible]);

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-cream/15 bg-surface">
      <div className="flex h-16 items-center gap-3 border-b border-cream/15 bg-surface2 px-4">
        <AgentAvatar />
        <div className="flex flex-1 flex-col leading-tight">
          <span className="text-sm font-semibold text-cream">
            42nights agent
          </span>
          <span className="text-[11px] text-cream/45">iMessage</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4"
      >
        <ImessageDayDivider label="Today 9:00 AM" />

        {beats.map((b, i) => (
          <BubbleIn key={`im-${mode}-${i}`} y={6}>
            <ImessageBubble
              side={b.who === "you" ? "right" : "left"}
              meta={b.meta}
            >
              {b.text}
            </ImessageBubble>
          </BubbleIn>
        ))}
      </div>

      <div className="border-t border-cream/15 bg-surface2 px-3 py-2">
        <div className="flex items-center gap-2 border border-cream/15 bg-cream/[0.03] px-3 py-2">
          <span className="text-cream/40">+</span>
          <span className="flex-1 text-[11px] text-cream/40">iMessage</span>
          <span className="flex h-5 w-5 items-center justify-center bg-accent text-white">
            <SendIcon className="h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ImessageDayDivider({ label }: { label: string }) {
  return (
    <div className="my-2 text-center text-[10px] font-medium text-cream/40">
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
            className={`mb-0.5 text-[10px] text-cream/40 ${isRight ? "text-right" : "text-left"}`}
          >
            {meta}
          </div>
        )}
        <div className="relative">
          <div
            className={`px-3.5 py-2 text-[14px] leading-snug ${
              isRight ? "bg-cream/10 text-cream" : "bg-accent/15 text-cream"
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

function WhatsappPanel({ mode, visible }: PanelProps) {
  const beats = beatsFor(mode, visible);
  const scrollRef = useAutoScroll([visible]);

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-cream/15 bg-surface">
      <div className="flex h-16 items-center gap-3 border-b border-cream/15 bg-surface2 px-4">
        <span className="text-lg text-cream/45">‹</span>
        <AgentAvatar />
        <div className="flex flex-1 flex-col leading-tight">
          <span className="text-sm font-semibold text-cream">
            42nights agent
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-cream/45">
            <span className="h-1.5 w-1.5 bg-[#25D366]" />
            online
          </span>
        </div>
        <div className="flex items-center gap-3.5 text-cream/45">
          <PhoneIcon className="h-[18px] w-[18px]" />
          <DotsIcon className="h-[18px] w-[18px]" />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-1 overflow-y-auto bg-void/40 px-3 py-3"
      >
        <div className="my-2 text-center">
          <span className="bg-cream/[0.06] px-2 py-1 text-[10px] font-medium text-cream/45">
            TODAY
          </span>
        </div>

        {beats.map((b, i) => (
          <BubbleIn key={`wa-${mode}-${i}`} y={6}>
            <WhatsappBubble
              side={b.who === "you" ? "right" : "left"}
              time={timeFromMeta(b.meta, i)}
              read={b.who === "you"}
            >
              {b.text}
            </WhatsappBubble>
          </BubbleIn>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-cream/15 bg-surface2 px-3 py-2">
        <SmileIcon className="h-5 w-5 text-cream/40" />
        <div className="flex-1 border border-cream/15 bg-cream/[0.03] px-3 py-2 text-[11px] text-cream/40">
          Type a message
        </div>
        <ClipIcon className="h-5 w-5 text-cream/40" />
        <div className="flex h-9 w-9 items-center justify-center bg-accent text-white">
          <MicIcon className="h-4 w-4" />
        </div>
      </div>
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
        className={`relative max-w-[80%] px-3 py-2 text-[14px] leading-snug ${
          isRight ? "bg-cream/[0.06] text-cream" : "bg-accent/15 text-cream"
        }`}
      >
        <div>{children}</div>
        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-cream/40">
          <span>{time}</span>
          {isRight && (
            <ChecksIcon
              className={`h-3.5 w-3.5 ${read ? "text-[#34B7F1]" : "text-cream/40"}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- inline icons ---- */
function Glyph({
  className = "h-4 w-4",
  fill = false,
  children,
}: {
  className?: string;
  fill?: boolean;
  children: ReactNode;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
const PhoneIcon = (p: { className?: string }) => (
  <Glyph {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </Glyph>
);
const DotsIcon = (p: { className?: string }) => (
  <Glyph fill {...p}>
    <circle cx="12" cy="5" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="12" cy="19" r="1.6" />
  </Glyph>
);
const SmileIcon = (p: { className?: string }) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
  </Glyph>
);
const ClipIcon = (p: { className?: string }) => (
  <Glyph {...p}>
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </Glyph>
);
const MicIcon = (p: { className?: string }) => (
  <Glyph {...p}>
    <rect x="9" y="2" width="6" height="11" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" />
  </Glyph>
);
const SendIcon = (p: { className?: string }) => (
  <Glyph {...p}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </Glyph>
);
const ChecksIcon = (p: { className?: string }) => (
  <Glyph {...p}>
    <path d="M2 13l3.5 3.5L13 9M9 13l3.5 3.5L20 9" />
  </Glyph>
);
