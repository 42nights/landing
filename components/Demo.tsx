"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { Reveal } from "@/components/motion/Reveal";

type Channel = "slack" | "imessage" | "whatsapp";
type Mode = "onboarding" | "ops";
type Phase = "idle" | "playing" | "awaiting" | "done";

// Keeps a scroll container pinned to the bottom as messages stream in.
function useAutoScroll(deps: unknown[]) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Defer one frame so a just-mounted element (e.g. the Approve CTA) is laid
    // out before we read scrollHeight; otherwise we scroll to a stale height and
    // the new content stays clipped below the fold.
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
    meta: "Day 1 · Embed",
    text: "Forward-deployed today. Sitting with your team, mapping the SaaS and internal systems you run on. I'll watch how billing, auth, and reporting actually work before I rebuild anything.",
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
    text: "Rebuilt billing and auth as services running in your VPC, source is yours. Closed loop is running: 1,284 tests, 9 patches, 3 regressions caught and fixed automatically. Want a walkthrough before I deploy?",
  },
  {
    who: "you",
    meta: "Jerry",
    text: "Yes, show me the billing cutover.",
  },
  {
    who: "agent",
    meta: "Day 9 · Rebuild",
    text: "Billing engine matches your vendor's behavior on 480/480 traced cases. Zero data leaves your infra. I'd cut over reporting next. Sound right?",
  },
  {
    who: "you",
    meta: "Jerry",
    text: "Right. Approved.",
  },
  {
    who: "agent",
    meta: "Day 14 · Deploy",
    text: "Ready to deploy in-house. I'll run live on your infra under a self-evolving harness: monitor, test, patch, improve, no vendor in the loop. I'll log every change to #engineering-ops. Approve to go live?",
  },
];

const rebuildModules = [
  { name: "Auth & SSO", state: "live", status: "active" },
  { name: "Billing engine", state: "in review", status: "stalled" },
  { name: "Reporting", state: "live", status: "active" },
  { name: "Admin console", state: "live", status: "active" },
];

const closedLoop = [
  { label: "Tests run", value: "1,284" },
  { label: "Patches shipped", value: "9" },
  { label: "Regressions caught", value: "3" },
];

const deployTargets = [
  { target: "Your VPC (us-east)", state: "connected" },
  { target: "Bare-metal cluster", state: "connected" },
];

export function Demo() {
  const [channel, setChannel] = useState<Channel>("slack");
  const [mode, setMode] = useState<Mode>("onboarding");
  const [phase, setPhase] = useState<Phase>("playing");
  const [visible, setVisible] = useState(1);
  const [final, setFinal] = useState<string | null>(null);

  const total =
    mode === "onboarding" ? onboardingScript.length : liveOpsMessages.length;

  useEffect(() => {
    if (phase !== "playing") return;
    if (visible >= total) {
      setPhase("awaiting");
      return;
    }
    const t = setTimeout(
      () => setVisible((v) => v + 1),
      mode === "onboarding" ? 1100 : 800,
    );
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
        "Live on your infra. The closed loop is running: I'll monitor, test, and patch the software in place. You'll see a prompt only when something needs your call.",
      );
    } else {
      setFinal(
        "Done. Patch shipped to your VPC and logged. Want the weekly build digest?",
      );
    }
    setPhase("done");
  }

  function reset(newMode?: Mode) {
    setPhase("playing");
    setVisible(1);
    setFinal(null);
    if (newMode) setMode(newMode);
  }

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
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-cream/70 md:mt-6 md:text-xl">
            Pick a channel and a phase. The conversation below is hardcoded, but
            every beat mirrors a real build-and-deploy engagement.
          </p>
        </Reveal>

        {/* Controls aligned to their panels: mode toggle over the workflow card,
            channel pills over the chat card (same 2-col grid as the cards). */}
        <div className="mt-10 grid gap-10 md:gap-12 lg:grid-cols-2 lg:justify-items-start">
          <div className="inline-flex w-fit  border border-cream/15 bg-cream/[0.03] p-1">
            <ModeButton
              active={mode === "onboarding"}
              onClick={() => reset("onboarding")}
              label="Build phase"
              sub="Weeks 1 to 2"
            />
            <ModeButton
              active={mode === "ops"}
              onClick={() => reset("ops")}
              label="Closed loop"
              sub="Post-deploy"
            />
          </div>
          <ChannelPills channel={channel} setChannel={setChannel} />
        </div>

        <Reveal
          as="div"
          stagger={0.12}
          y={24}
          start="top 85%"
          className="mt-10 grid gap-10 md:gap-12 lg:grid-cols-2"
        >
          {/* Workflow panel */}
          <div className="flex h-[600px] flex-col  border border-cream/15 bg-surface">
            <div className="flex items-center justify-between border-b border-cream/15 px-5 py-3">
              <div className="text-sm font-medium text-cream">Workflow</div>
              <div className="font-mono-label text-[10px] text-cream/45">
                {mode === "onboarding" ? "mapping" : "live"}
              </div>
            </div>
            <div className="min-h-0 flex-1 divide-y divide-cream/[0.06] overflow-y-auto px-5 pb-5 pt-5">
              <Block title="Modules Rebuilt" subtitle="this sprint">
                <ul className="divide-y divide-cream/[0.06] text-sm">
                  {rebuildModules.map((m) => (
                    <li
                      key={m.name}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-cream/80">{m.name}</span>
                      <span
                        className={
                          m.status === "stalled"
                            ? "text-accentBright"
                            : "text-cream/55"
                        }
                      >
                        {m.state}
                      </span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Closed-Loop Activity" subtitle="last 24h">
                <ul className="divide-y divide-cream/[0.06] text-sm">
                  {closedLoop.map((c) => (
                    <li
                      key={c.label}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-cream/80">{c.label}</span>
                      <span className="text-cream/55">{c.value}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Deploy Targets">
                <ul className="divide-y divide-cream/[0.06] text-sm">
                  {deployTargets.map((d) => (
                    <li
                      key={d.target}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-cream/80">{d.target}</span>
                      <span className="text-cream/55">{d.state}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Reverse-Engineering Coverage">
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="font-serif-display text-2xl text-cream">
                    412
                  </span>
                  <span className="text-sm text-cream/55">
                    of 480 endpoints
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full  bg-cream/10">
                  <div
                    className="h-full  bg-cream/80"
                    style={{ width: "86%" }}
                  />
                </div>
              </Block>
            </div>
          </div>

          {/* Chat panel, channel-specific chrome */}
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
        </Reveal>

        <p className="mt-10 max-w-3xl text-sm italic text-cream/45">
          This is a hardcoded demo. The real agents work on your company's
          actual systems, reverse-engineering your SaaS, rebuilding it in your
          VPC, and running a closed loop that maintains it in place.
        </p>
      </div>
    </section>
  );
}

/**
 * BubbleIn: GSAP replacement for the former framer-motion message-entrance.
 * Each rendered bubble has a stable unique key, so it mounts fresh as the
 * state machine advances. A scoped useGSAP runs once on mount and fades the
 * node up. Reduced motion shows it statically via gsap.matchMedia.
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
      aria-pressed={active}
      className={`btn-press  px-4 py-1.5 text-left text-sm transition-colors ${
        active
          ? "bg-cream/10 text-cream"
          : "text-cream/70 hover:bg-cream/[0.05] hover:text-cream"
      }`}
    >
      <div className="font-medium leading-tight">{label}</div>
      <div
        className={`text-[11px] ${active ? "text-cream/55" : "text-cream/40"}`}
      >
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
    <div className="inline-flex  border border-cream/15 bg-cream/[0.03] p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setChannel(t.id)}
          aria-pressed={channel === t.id}
          className={`btn-press  px-3 py-1.5 text-xs transition-colors ${
            channel === t.id
              ? "bg-cream/10 text-cream"
              : "text-cream/55 hover:bg-cream/[0.05] hover:text-cream"
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
  const channelName = mode === "onboarding" ? "42n-build" : "engineering-ops";
  const scrollRef = useAutoScroll([visible, phase, final]);
  return (
    <div className="flex h-[600px] flex-col overflow-hidden  border border-cream/15 bg-surface">
      <div className="flex items-center justify-between border-b border-cream/15 bg-surface2 px-5 py-3">
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
        {mode === "ops" && (
          <SlackMessage who="42nights agent" time="9:42 AM" agent>
            Hi, I noticed something in your deployed stack.
          </SlackMessage>
        )}
        {mode === "onboarding" && (
          <SlackMessage who="42nights agent" time="Day 0 · 9:00 AM" agent>
            Hello. I'm your forward-deployed agent. Starting a 1 to 2 week embed
            today, mapping the software you run on. I'll observe before I
            rebuild.
          </SlackMessage>
        )}

        {(mode === "onboarding"
          ? onboardingScript.slice(0, visible)
          : liveOpsMessages.slice(0, visible).map((t) => ({
              who: "agent" as const,
              meta: "9:42 AM",
              text: t,
            }))
        ).map((b, i) => (
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

        {final && (
          <BubbleIn>
            <SlackMessage who="42nights agent" time="just now" agent>
              {final}
            </SlackMessage>
          </BubbleIn>
        )}
      </div>

      <ControlBar
        phase={phase}
        mode={mode}
        onStart={onStart}
        onReset={onReset}
        onApprove={onApprove}
        onSkipToOps={onSkipToOps}
      />
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
        className={`flex h-9 w-9 shrink-0 items-center justify-center  text-sm font-semibold ${
          agent ? "bg-accent/15 text-accentBright" : "bg-cream/10 text-cream"
        }`}
      >
        {initial}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-cream">{who}</span>
          {agent && (
            <span className=" bg-cream/10 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wide text-cream/55">
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
  const scrollRef = useAutoScroll([visible, phase, final]);

  return (
    <div className="flex h-[600px] flex-col overflow-hidden  border border-cream/15 bg-surface">
      {/* iMessage status bar + contact header */}
      <div className="border-b border-cream/15 bg-surface2">
        <div className="flex items-center justify-between px-4 pt-2 text-[11px] font-semibold text-cream/80">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span>•••</span>
            <span>5G</span>
            <span>▮</span>
          </span>
        </div>
        <div className="flex flex-col items-center pb-3 pt-2">
          <div className="flex h-10 w-10 items-center justify-center  bg-accent/15 text-sm font-semibold text-accentBright">
            42
          </div>
          <div className="mt-1 text-[11px] font-medium text-cream">
            42nights agent
          </div>
          <div className="text-[10px] text-cream/40">iMessage</div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4"
      >
        <ImessageDayDivider label="Today 9:00 AM" />

        {mode === "onboarding" && (
          <ImessageBubble side="left">
            Hello. I'm your forward-deployed agent. Starting a 1 to 2 week embed
            today, mapping the software you run on. I'll observe before I
            rebuild.
          </ImessageBubble>
        )}
        {mode === "ops" && (
          <ImessageBubble side="left">
            Hi, I noticed something in your deployed stack.
          </ImessageBubble>
        )}

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

        {final && (
          <BubbleIn y={6}>
            <ImessageBubble side="left">{final}</ImessageBubble>
          </BubbleIn>
        )}

        {phase === "done" && (
          <div className="mt-1 text-right text-[10px] text-cream/40">
            Delivered
          </div>
        )}
      </div>

      {/* iMessage compose */}
      <div className="border-t border-cream/15 bg-surface2 px-3 py-2">
        <div className="flex items-center gap-2  border border-cream/15 bg-cream/[0.03] px-3 py-2">
          <span className="text-cream/40">+</span>
          <span className="flex-1 text-[11px] text-cream/40">iMessage</span>
          <span className=" bg-accent px-2 py-0.5 text-[10px] text-white">
            ↑
          </span>
        </div>
      </div>

      <ControlBar
        phase={phase}
        mode={mode}
        onStart={onStart}
        onReset={onReset}
        onApprove={onApprove}
        onSkipToOps={onSkipToOps}
      />
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
              isRight
                ? "  bg-cream/10 text-cream"
                : "  bg-accent/15 text-cream"
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
  const scrollRef = useAutoScroll([visible, phase, final]);

  return (
    <div className="flex h-[600px] flex-col overflow-hidden  border border-cream/15 bg-surface">
      {/* WhatsApp top bar, dark surface with a green presence cue (no flat color block) */}
      <div className="flex items-center gap-3 border-b border-cream/15 bg-surface2 px-4 py-3">
        <span className="text-lg text-cream/45">‹</span>
        <div className="flex h-9 w-9 items-center justify-center  bg-accent/15 text-sm font-semibold text-accentBright">
          42
        </div>
        <div className="flex flex-1 flex-col leading-tight">
          <span className="text-sm font-semibold text-cream">
            42nights agent
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-cream/45">
            <span className="h-1.5 w-1.5  bg-[#25D366]" />
            online
          </span>
        </div>
        <div className="flex items-center gap-3 text-cream/45">
          <span className="text-base">📞</span>
          <span className="text-base">⋮</span>
        </div>
      </div>

      {/* Messages on dark surface */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-1 overflow-y-auto bg-void/40 px-3 py-3"
      >
        <div className="my-2 text-center">
          <span className=" bg-cream/[0.06] px-2 py-1 text-[10px] font-medium text-cream/45">
            TODAY
          </span>
        </div>

        {mode === "onboarding" && (
          <WhatsappBubble side="left" time="9:00">
            Hello. I'm your forward-deployed agent. Starting a 1 to 2 week embed
            today, mapping the software you run on. I'll observe before I
            rebuild.
          </WhatsappBubble>
        )}
        {mode === "ops" && (
          <WhatsappBubble side="left" time="9:42">
            Hi, I noticed something in your deployed stack.
          </WhatsappBubble>
        )}

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

        {final && (
          <BubbleIn y={6}>
            <WhatsappBubble side="left" time="now">
              {final}
            </WhatsappBubble>
          </BubbleIn>
        )}
      </div>

      {/* Compose */}
      <div className="flex items-center gap-2 border-t border-cream/15 bg-surface2 px-3 py-2">
        <span className="text-base text-cream/40">😊</span>
        <div className="flex-1  border border-cream/15 bg-cream/[0.03] px-3 py-2 text-[11px] text-cream/40">
          Type a message
        </div>
        <span className="text-base text-cream/40">📎</span>
        <div className="flex h-9 w-9 items-center justify-center  bg-accent text-white">
          🎤
        </div>
      </div>

      <ControlBar
        phase={phase}
        mode={mode}
        onStart={onStart}
        onReset={onReset}
        onApprove={onApprove}
        onSkipToOps={onSkipToOps}
      />
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
        className={`relative max-w-[80%]  px-3 py-2 text-[14px] leading-snug ${
          isRight ? "bg-cream/[0.06] text-cream" : "bg-accent/15 text-cream"
        }`}
      >
        <div>{children}</div>
        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-cream/40">
          <span>{time}</span>
          {isRight && (
            <span className={read ? "text-[#34B7F1]" : "text-cream/40"}>
              ✓✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------- Shared ----------------- */

function ControlBar({
  phase,
  mode,
  onStart,
  onReset,
  onApprove,
  onSkipToOps,
}: {
  phase: Phase;
  mode: Mode;
  onStart: () => void;
  onReset: () => void;
  onApprove: () => void;
  onSkipToOps: () => void;
}) {
  return (
    <div className="border-t border-cream/15 bg-surface2 px-5 py-3">
      {phase === "idle" && (
        <button
          onClick={onStart}
          className="btn-press w-full  bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accentBright animate-pulse-ring"
        >
          {mode === "onboarding"
            ? "Walk me through the build"
            : "Show me what the agent shipped today"}
        </button>
      )}
      {/* The decision lives in the footer, always reachable — never buried in the
          scroll. */}
      {phase === "awaiting" && (
        <div className="flex items-center gap-2">
          {mode === "onboarding" ? (
            <>
              <button
                onClick={onApprove}
                className="btn-press flex-1  bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accentBright"
              >
                Approve, deploy in-house
              </button>
              <button
                onClick={onSkipToOps}
                className="btn-press shrink-0  border border-cream/15 bg-cream/[0.03] px-4 py-2 text-sm text-cream/85 hover:border-cream/35 hover:bg-cream/[0.06]"
              >
                Skip to the closed loop
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onApprove}
                className="btn-press flex-1  bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accentBright"
              >
                Approve all
              </button>
              <button
                disabled
                aria-disabled="true"
                title="Hardcoded demo — only Approve all is wired"
                className="shrink-0 cursor-not-allowed  border border-cream/15 bg-cream/[0.02] px-4 py-2 text-sm text-cream/40"
              >
                Review individually
              </button>
            </>
          )}
        </div>
      )}
      {(phase === "playing" || phase === "done") && (
        <button
          onClick={onReset}
          className="text-xs text-cream/45 underline-offset-4 transition-colors hover:text-cream hover:underline"
        >
          ↻ replay demo
        </button>
      )}
    </div>
  );
}

function Block({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-medium text-cream/90">{title}</div>
        {subtitle && (
          <div className="font-mono-label text-[10px] text-cream/40">
            {subtitle}
          </div>
        )}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
