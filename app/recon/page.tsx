import type { Metadata } from 'next';
import Link from 'next/link';
import GsapClient from '@/components/GsapClient';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import Terminal from '@/components/Terminal';

export const metadata: Metadata = {
  title: 'Recon — operating substrate for ops-heavy teams',
  description:
    'The self-hosted, single-tenant, audit-ready platform that Pulse and Helm are built on. Deployed by 42nights.',
  alternates: { canonical: '/recon' },
  openGraph: {
    type: 'website',
    url: '/recon',
    title: 'Recon — operating substrate for ops-heavy teams',
    description:
      'Self-hosted gateway, identity vault, agent runtime. The platform Pulse and Helm are built on.',
    siteName: '42nights',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recon — operating substrate for ops-heavy teams',
    description:
      'Self-hosted gateway, identity vault, agent runtime. The platform Pulse and Helm are built on.',
  },
};

export const viewport = { themeColor: '#cdfb53' };

const ArrowSm = () => (
  <svg
    viewBox="0 0 16 16"
    width="13"
    height="13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const ArrowSmInRow = () => (
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

// helper: glass-box positioning vars
const pos = (x: number, y: number, w: number, h: number): React.CSSProperties =>
  ({
    ['--x' as string]: x,
    ['--y' as string]: y,
    ['--w' as string]: w,
    ['--h' as string]: h,
  }) as React.CSSProperties;

export default function ReconPage() {
  return (
    <div data-theme="recon">
      <Nav active="recon" />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" data-parallax="0.4" />
        <div className="hero-orb" aria-hidden="true" data-parallax="0.7" />
        <div className="hero-radar" aria-hidden="true" data-parallax="0.5">
          <span className="radar-ring" />
          <span className="radar-ring r2" />
          <span className="radar-ring r3" />
          <span className="radar-sweep" />
        </div>
        <div className="hero-bg-word" aria-hidden="true" data-parallax="0.25">
          recon
        </div>

        <div className="container hero-inner">
          <div className="hero-badge" data-reveal>
            <span className="ping" />
            <span>Self-hosted · Single-tenant · Audit-ready</span>
          </div>

          <h1 className="hero-title">
            <span className="line">
              <span className="word">The</span> <span className="word">operating</span>{' '}
              <span className="word">substrate</span>
            </span>
            <span className="line">
              <span className="word">for</span> <span className="word italic">ops-heavy</span>{' '}
              <span className="word">teams.</span>
            </span>
          </h1>
          <p className="hero-sub" data-reveal>
            Recon is the self-hosted gateway, workspace, and skill runtime that{' '}
            <Link className="inline-link" href="/pulse">
              Pulse
            </Link>{' '}
            and{' '}
            <Link className="inline-link helm-link" href="/helm">
              Helm
            </Link>{' '}
            are built on. Deployed by{' '}
            <Link className="inline-link" href="/">
              42nights
            </Link>{' '}
            inside your perimeter.
          </p>
          <p className="hero-audience" data-reveal>
            RevOps · Sales leadership · Operating partners · COOs · Family offices
          </p>

          <div className="hero-cta" data-reveal>
            <a className="btn btn-primary" href="#cta" data-magnetic>
              <span>Book a demo</span>
              <ArrowSm />
            </a>
            <a className="btn btn-ghost" href="mailto:jerry@xiao.sh?subject=Recon%20enquiry">
              <span>Talk to us</span>
            </a>
          </div>

          <div className="hero-stats" data-reveal>
            <div className="stat">
              <span className="stat-num" data-counter="100">
                0
              </span>
              <span className="stat-label">% on your own infra</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" data-counter="2">
                0
              </span>
              <span className="stat-label">product surfaces</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" data-counter="0">
                0
              </span>
              <span className="stat-label">vendor lock-in</span>
            </div>
          </div>
        </div>

        <Marquee
          items={[
            'Salesforce',
            'HubSpot',
            'Gmail',
            'Outlook',
            'Slack',
            'Linear',
            'QuickBooks',
            'Stripe',
            'NetSuite',
            'Xero',
            'Apollo',
            'Clay',
            'PostHog',
            'Notion',
            'Drive',
            'Box',
            'MCP servers',
          ]}
        />
      </section>

      {/* WHY (perimeter diagram) */}
      <section className="section" id="why">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          01
        </div>
        <div className="container">
          <div className="section-head section-head-narrow">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              Why operators choose Recon
            </div>
            <h2 className="section-title" data-split>
              Your data. Your perimeter. <em>Your agents.</em>
            </h2>
          </div>

          <div className="perimeter-stage" data-reveal>
            <div className="perim-canvas">
              <svg
                viewBox="0 0 1000 540"
                className="perimeter-svg"
                role="img"
                aria-labelledby="perimTitle"
                preserveAspectRatio="xMidYMid meet"
              >
                <title id="perimTitle">
                  Recon stays inside your perimeter; connectors call out, never in
                </title>
                <defs>
                  <pattern id="perimGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="1000" height="540" fill="url(#perimGrid)" />
                <rect
                  x="60"
                  y="74"
                  width="600"
                  height="396"
                  rx="16"
                  fill="rgba(205, 251, 83, 0.018)"
                  stroke="rgba(205, 251, 83, 0.45)"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  className="perim-boundary"
                />
                <path d="M200 178 Q200 220 270 250" stroke="rgba(255,255,255,0.18)" fill="none" strokeWidth="1.2" />
                <path d="M520 178 Q520 220 450 250" stroke="rgba(255,255,255,0.18)" fill="none" strokeWidth="1.2" />
                <line x1="360" y1="338" x2="360" y2="380" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
                <g className="perim-flows" strokeLinecap="round" fill="none" strokeWidth="1.4">
                  <path d="M480 274 C 600 274 620 122 720 122" strokeDasharray="4 6" />
                  <path d="M480 286 C 600 286 620 182 720 182" strokeDasharray="4 6" />
                  <path d="M480 298 C 600 298 620 242 720 242" strokeDasharray="4 6" />
                  <path d="M480 310 C 600 310 620 302 720 302" strokeDasharray="4 6" />
                  <path d="M480 322 C 600 322 620 362 720 362" strokeDasharray="4 6" />
                </g>
              </svg>

              <div className="perim-overlay">
                <span className="perim-label-text perim-title-text" style={pos(80, 58, 0, 0)}>
                  YOUR PERIMETER
                </span>
                <span className="perim-label-text perim-sub-text" style={pos(222, 58, 0, 0)}>
                  VPC · laptop · air-gapped
                </span>

                <div className="glass glass-pulse" style={pos(110, 120, 180, 58)}>
                  <div className="g-name">Pulse</div>
                  <div className="g-tag">GTM workspace</div>
                </div>
                <div className="glass glass-helm" style={pos(430, 120, 180, 58)}>
                  <div className="g-name">Helm</div>
                  <div className="g-tag">Portfolio cockpit</div>
                </div>

                <div className="glass glass-gateway" style={pos(240, 252, 240, 86)}>
                  <div className="g-name strong">Gateway</div>
                  <div className="g-tag">audit log · vault · skill runtime</div>
                </div>

                <div className="glass glass-db" style={pos(290, 380, 140, 46)}>
                  <div className="g-name muted">your DB</div>
                </div>

                <div className="glass glass-ext" style={pos(720, 102, 240, 40)}>
                  Salesforce · HubSpot
                </div>
                <div className="glass glass-ext" style={pos(720, 162, 240, 40)}>
                  Stripe · QuickBooks · Xero
                </div>
                <div className="glass glass-ext" style={pos(720, 222, 240, 40)}>
                  Gmail · Outlook · Calendar
                </div>
                <div className="glass glass-ext" style={pos(720, 282, 240, 40)}>
                  Apollo · Clay · PostHog
                </div>
                <div className="glass glass-ext" style={pos(720, 342, 240, 40)}>
                  MCP servers · LLM APIs
                </div>

                <div className="glass glass-tag glass-deny" style={pos(60, 490, 200, 32)}>
                  <span className="x-mark" aria-hidden="true">
                    ✕
                  </span>
                  <span>no inbound</span>
                </div>
                <div className="glass glass-tag glass-allow" style={pos(280, 490, 200, 32)}>
                  <span>→ outbound only</span>
                </div>
                <div className="glass glass-tag" style={pos(500, 490, 200, 32)}>
                  <span>audit log signed</span>
                </div>
                <div className="glass glass-tag" style={pos(720, 490, 240, 32)}>
                  <span>your keys, your network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section" id="products">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          02
        </div>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              Two products · one substrate
            </div>
            <h2 className="section-title" data-split>
              Pulse for revenue.
              <br />
              <em>Helm</em> for portfolios.
            </h2>
            <p className="section-lede" data-reveal>
              Both wrap the same self-hosted core — same gateway, same identity vault, same skill
              substrate. Different operators, very different jobs to be done.
            </p>
          </div>

          <div className="product-grid">
            <Link className="product-card" href="/pulse" data-product="pulse" data-reveal>
              <div className="product-head">
                <div className="product-mark pulse-mark">
                  <svg
                    viewBox="0 0 32 32"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 16h6l3-9 6 18 3-9h10" />
                  </svg>
                </div>
                <div>
                  <div className="product-name">Pulse</div>
                  <div className="product-tag">GTM operating system</div>
                </div>
              </div>
              <h3 className="product-headline">
                The operating layer between raw signal and revenue execution.
              </h3>
              <p className="product-copy">
                Identity-resolved CRM, inbox-first sync, Apollo / Clay-style enrichment, scheduled
                outbound, attribution and forecast — all on infrastructure you control.
              </p>
              <div className="product-foot">
                <span className="product-audience">RevOps · Sales · Growth</span>
                <span className="product-arrow" aria-hidden="true">
                  <ArrowSmInRow />
                </span>
              </div>
              <div className="product-glow" />
            </Link>

            <Link className="product-card helm" href="/helm" data-product="helm" data-reveal>
              <div className="product-head">
                <div className="product-mark helm-mark">
                  <svg
                    viewBox="0 0 32 32"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="16" cy="16" r="6" />
                    <path d="M16 4v6M16 22v6M4 16h6M22 16h6M7.5 7.5l4.2 4.2M20.3 20.3l4.2 4.2M7.5 24.5l4.2-4.2M20.3 11.7l4.2-4.2" />
                  </svg>
                </div>
                <div>
                  <div className="product-name">Helm</div>
                  <div className="product-tag">Portfolio operating cockpit</div>
                </div>
              </div>
              <h3 className="product-headline">
                A holdco cockpit — every portco a workspace, rolling up to one view.
              </h3>
              <p className="product-copy">
                KPI ingest from QuickBooks, Stripe, HRIS, HubSpot. Variance flags with agent-drafted
                commentary. Per-deal DD workspace generator. Cross-portfolio benchmarking on margin,
                CAC payback, NRR.
              </p>
              <div className="product-foot">
                <span className="product-audience">
                  Operating partners · Holdcos · Family offices
                </span>
                <span className="product-arrow" aria-hidden="true">
                  <ArrowSmInRow />
                </span>
              </div>
              <div className="product-glow" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW (architecture stack) */}
      <section className="section section-narrow" id="how">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          03
        </div>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              How it deploys
            </div>
            <h2 className="section-title" data-split>
              Three layers. <em>One process tree.</em>
            </h2>
          </div>

          <div className="arch-stack" data-stagger>
            <div className="arch-layer arch-shells">
              <span className="al-tag">Shells</span>
              <div className="al-cells">
                <span className="al-cell">apps/web</span>
                <span className="al-cell pulse">Pulse</span>
                <span className="al-cell helm">Helm</span>
              </div>
            </div>
            <div className="arch-arrow" />
            <div className="arch-layer arch-gateway">
              <span className="al-tag">Gateway</span>
              <div className="al-cells">
                <span className="al-cell strong">profile-managed daemon</span>
                <span className="al-cell">audit signer</span>
                <span className="al-cell">credential vault</span>
              </div>
            </div>
            <div className="arch-arrow" />
            <div className="arch-layer arch-ext">
              <span className="al-tag">Extensions</span>
              <div className="al-cells">
                <span className="al-cell">AI gateway</span>
                <span className="al-cell">Identity</span>
                <span className="al-cell">Composio</span>
                <span className="al-cell">Apollo</span>
                <span className="al-cell">PostHog</span>
              </div>
            </div>
            <div className="arch-arrow down" />
            <div className="arch-deploys">
              <span className="kbd">macOS</span>
              <span className="kbd">Linux</span>
              <span className="kbd">Docker</span>
              <span className="kbd">VPC</span>
              <span className="kbd">Air-gapped</span>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section" id="capabilities">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          04
        </div>
        <div className="container">
          <div className="section-head section-head-narrow">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              Capabilities
            </div>
            <h2 className="section-title" data-split>
              What it does, <em>out of the box.</em>
            </h2>
          </div>

          <div className="cap-grid" data-stagger>
            <article className="cap-tile">
              <svg className="cap-vis" viewBox="0 0 220 92" aria-hidden="true">
                <rect x="0" y="6" width="92" height="14" rx="3" fill="rgba(255,255,255,0.06)" />
                <text x="6" y="17" className="cap-label">maya@northstar.io</text>
                <rect x="0" y="36" width="106" height="14" rx="3" fill="rgba(255,255,255,0.06)" />
                <text x="6" y="47" className="cap-label">m.adams@northstar.io</text>
                <rect x="0" y="66" width="100" height="14" rx="3" fill="rgba(255,255,255,0.06)" />
                <text x="6" y="77" className="cap-label">li/maya-adams</text>
                <path d="M 92 13 C 120 13 130 43 145 43" stroke="var(--accent)" fill="none" strokeDasharray="3 3" />
                <path d="M 106 43 L 145 43" stroke="var(--accent)" fill="none" strokeDasharray="3 3" />
                <path d="M 100 73 C 120 73 130 43 145 43" stroke="var(--accent)" fill="none" strokeDasharray="3 3" />
                <rect x="145" y="34" width="72" height="20" rx="4" fill="rgba(205,251,83,0.15)" stroke="var(--accent)" />
                <text x="181" y="48" className="cap-label-out" textAnchor="middle">M. Adams</text>
              </svg>
              <h3>Identity-resolved CRM</h3>
              <p>Three channels. One row.</p>
            </article>

            <article className="cap-tile">
              <svg className="cap-vis" viewBox="0 0 220 92" aria-hidden="true">
                <circle cx="20" cy="46" r="7" fill="var(--accent)" />
                <circle cx="20" cy="46" r="14" fill="none" stroke="var(--accent)" strokeOpacity="0.4" />
                <text x="6" y="78" className="cap-label">trigger</text>
                <line x1="34" y1="46" x2="78" y2="46" stroke="var(--accent)" strokeDasharray="3 4" />
                <rect x="78" y="32" width="56" height="28" rx="6" fill="rgba(205,251,83,0.16)" stroke="var(--accent)" />
                <text x="106" y="50" className="cap-label-out" textAnchor="middle">RUN</text>
                <line x1="134" y1="46" x2="178" y2="46" stroke="var(--accent)" strokeDasharray="3 4" />
                <rect x="178" y="32" width="34" height="28" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
                <text x="195" y="50" className="cap-label-out muted" textAnchor="middle">DIFF</text>
                <text x="195" y="78" className="cap-label" textAnchor="middle">review</text>
              </svg>
              <h3>Skills act on schedule</h3>
              <p>Trigger → run → diff back.</p>
            </article>

            <article className="cap-tile">
              <svg className="cap-vis" viewBox="0 0 220 92" aria-hidden="true">
                <rect x="0" y="4" width="44" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
                <text x="48" y="13" className="cap-label">posthog</text>
                <rect x="0" y="22" width="44" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
                <text x="48" y="31" className="cap-label">apollo</text>
                <rect x="0" y="40" width="44" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
                <text x="48" y="49" className="cap-label">clearbit</text>
                <rect x="0" y="58" width="44" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
                <text x="48" y="67" className="cap-label">webhook</text>
                <rect x="0" y="76" width="44" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
                <text x="48" y="85" className="cap-label">linkedin</text>
                <path d="M 100 4 L 150 36 L 150 56 L 100 88 Z" fill="rgba(205,251,83,0.05)" stroke="var(--accent)" strokeOpacity="0.4" />
                <rect x="150" y="36" width="68" height="20" rx="10" fill="rgba(205,251,83,0.16)" stroke="var(--accent)" />
                <text x="184" y="50" className="cap-label-out" textAnchor="middle">signals</text>
              </svg>
              <h3>One surface for intent</h3>
              <p>Many sources. One stream.</p>
            </article>

            <article className="cap-tile">
              <svg className="cap-vis" viewBox="0 0 220 92" aria-hidden="true">
                <rect x="10" y="58" width="14" height="22" rx="2" fill="rgba(126,197,255,0.55)" />
                <rect x="30" y="44" width="14" height="36" rx="2" fill="rgba(126,197,255,0.55)" />
                <rect x="50" y="62" width="14" height="18" rx="2" fill="rgba(126,197,255,0.55)" />
                <rect x="70" y="36" width="14" height="44" rx="2" fill="rgba(126,197,255,0.55)" />
                <rect x="90" y="50" width="14" height="30" rx="2" fill="rgba(126,197,255,0.55)" />
                <text x="57" y="92" className="cap-label" textAnchor="middle">portcos</text>
                <line x1="120" y1="58" x2="148" y2="58" stroke="rgb(126, 197, 255)" strokeWidth="1.4" />
                <polyline points="142,53 148,58 142,63" stroke="rgb(126, 197, 255)" fill="none" strokeWidth="1.4" />
                <rect x="158" y="20" width="44" height="60" rx="5" fill="rgba(126,197,255,0.22)" stroke="rgb(126, 197, 255)" />
                <text x="180" y="92" className="cap-label" textAnchor="middle">holdco</text>
              </svg>
              <h3>Holdco KPI roll-ups</h3>
              <p>Portcos in. Dashboard out.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="section section-narrow" id="roadmap">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          05
        </div>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              Roadmap
            </div>
            <h2 className="section-title" data-split>
              Five phases. <em>Two products.</em> One substrate.
            </h2>
          </div>

          <div className="roadmap-tabs" role="tablist" aria-label="Roadmap product">
            <button className="rt-btn active" data-roadmap="pulse" role="tab" aria-selected="true">
              Pulse — GTM
            </button>
            <button className="rt-btn" data-roadmap="helm" role="tab" aria-selected="false">
              Helm — PE
            </button>
            <span className="rt-indicator" aria-hidden="true" />
          </div>

          <div className="rm-timeline" data-active-phase="0">
            <div className="rm-track">
              <div className="rm-line" />
              <div className="rm-progress" />
              <button className="rm-dot active" data-phase-idx="0" aria-label="Phase 1">
                <span>01</span>
              </button>
              <button className="rm-dot" data-phase-idx="1" aria-label="Phase 2">
                <span>02</span>
              </button>
              <button className="rm-dot" data-phase-idx="2" aria-label="Phase 3">
                <span>03</span>
              </button>
              <button className="rm-dot" data-phase-idx="3" aria-label="Phase 4">
                <span>04</span>
              </button>
              <button className="rm-dot" data-phase-idx="4" aria-label="Phase 5">
                <span>05</span>
              </button>
            </div>

            <div className="rm-stage">
              <div className="rm-panels active" data-roadmap-panel="pulse">
                <div className="rm-panel active" data-phase-idx="0">
                  <span className="rm-tag">Phase 1 · Pulse</span>
                  <h4>Pipeline foundations</h4>
                  <p>
                    Canonical People + Company model. Inbox-first sync. Calendar → meeting → deal
                    attribution. Lifecycle stage, owner, last touch.
                  </p>
                </div>
                <div className="rm-panel" data-phase-idx="1">
                  <span className="rm-tag">Phase 2 · Pulse</span>
                  <h4>Signal capture</h4>
                  <p>
                    Apollo / Clay enrichment. PostHog event timeline. LinkedIn + outbound capture.
                    Intent adapters behind one <code>signals</code> surface.
                  </p>
                </div>
                <div className="rm-panel" data-phase-idx="2">
                  <span className="rm-tag">Phase 3 · Pulse</span>
                  <h4>Agentic execution</h4>
                  <p>
                    Lead triage · ICP scoring · outbound draft · meeting prep · pipeline review ·
                    churn flag. Per-account next-best-action on a schedule.
                  </p>
                </div>
                <div className="rm-panel" data-phase-idx="3">
                  <span className="rm-tag">Phase 4 · Pulse</span>
                  <h4>Revenue analytics</h4>
                  <p>
                    Weighted forecast by stage / owner / segment. Source → meeting → opp
                    attribution. Cohort retention via PostHog or warehouse adapter.
                  </p>
                </div>
                <div className="rm-panel" data-phase-idx="4">
                  <span className="rm-tag">Phase 5 · Pulse</span>
                  <h4>Multiplayer</h4>
                  <p>
                    Team workspaces with row-level RBAC. Shared skill libraries with review/approval.
                    Slack / Linear two-way sync for handoffs.
                  </p>
                </div>
              </div>

              <div className="rm-panels" data-roadmap-panel="helm">
                <div className="rm-panel active" data-phase-idx="0">
                  <span className="rm-tag">Phase 1 · Helm</span>
                  <h4>Multi-entity foundation</h4>
                  <p>
                    Workspace-as-portfolio-company. HoldCo workspace aggregating read-only views.
                    Entities: Company, People, Contracts, KPIs, Reporting periods.
                  </p>
                </div>
                <div className="rm-panel" data-phase-idx="1">
                  <span className="rm-tag">Phase 2 · Helm</span>
                  <h4>Operating cadence</h4>
                  <p>
                    QuickBooks / Xero / NetSuite, Stripe, HRIS, Hub/Salesforce ingest. Auto-populated
                    monthly &amp; quarterly templates with variance flags.
                  </p>
                </div>
                <div className="rm-panel" data-phase-idx="2">
                  <span className="rm-tag">Phase 3 · Helm</span>
                  <h4>Diligence &amp; deal flow</h4>
                  <p>
                    Deal pipeline as a first-class object. Per-deal DD workspace generator.
                    Data-room ingest with auto-tagging and risk flag agents.
                  </p>
                </div>
                <div className="rm-panel" data-phase-idx="3">
                  <span className="rm-tag">Phase 4 · Helm</span>
                  <h4>Portfolio agents</h4>
                  <p>
                    Operating-partner agent per portco. Cross-portfolio benchmarking on margin, CAC
                    payback, NRR percentiles. Talent-network agent.
                  </p>
                </div>
                <div className="rm-panel" data-phase-idx="4">
                  <span className="rm-tag">Phase 5 · Helm</span>
                  <h4>LP &amp; governance</h4>
                  <p>
                    LP reporting view (capital account, IRR/MOIC). Board-pack generator from
                    operating-partner output. SOC2-ready audit trail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section section-narrow trust-sec" id="trust">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          06
        </div>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              Trust
            </div>
            <h2 className="section-title" data-split>
              Built to pass<br />
              <em>your security review.</em>
            </h2>
          </div>
          <p className="trust-statement" data-reveal>
            Single-tenant by definition. Bring your own keys for LLM, CRM, storage, and identity.
            SOC2-ready audit log per workspace, per skill, per credential — pipe it straight to your
            SIEM. Zero telemetry, verifiable in source provided under your contract.
            Workspace-scoped RBAC isolates your sales workspace from your portfolio data, by
            default.
          </p>
          <ul className="trust-tags" data-stagger role="list">
            <li>SOC2-ready audit trail</li>
            <li>Bring your own keys</li>
            <li>On-prem / VPC / Air-gapped</li>
            <li>Single-tenant by design</li>
            <li>Zero telemetry</li>
            <li>Workspace-scoped RBAC</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-sec" id="cta">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          07
        </div>
        <div className="container">
          <div className="cta-card" data-reveal>
            <div className="cta-copy">
              <div className="eyebrow">
                <span className="dot" />
                Get started
              </div>
              <h2 className="section-title" data-split>
                Run it where your<br />
                <em>data already lives.</em>
              </h2>
              <p className="section-lede">
                We deploy Recon inside your perimeter and stay close through onboarding,
                integration, and skill-pack tuning. Talk to us about scope, security, and pricing.
              </p>
              <div className="hero-cta">
                <a
                  className="btn btn-primary"
                  href="mailto:jerry@xiao.sh?subject=Recon%20demo%20request"
                  data-magnetic
                >
                  <span>Book a demo</span>
                  <ArrowSm />
                </a>
                <a className="btn btn-ghost" href="mailto:jerry@xiao.sh?subject=Recon%20enquiry">
                  <span>Talk to us</span>
                </a>
              </div>
            </div>

            <Terminal
              title="recon · acme-prod"
              lines={[
                { prompt: '$', cmd: 'recon up --profile=acme-prod' },
                { prompt: '', out: '▲ workspace ready · auth via SSO', outClass: 'ok' },
                { prompt: '$', cmd: 'recon connect hubspot --read-only' },
                { prompt: '', out: '✓ 4,212 contacts · 318 active deals indexed' },
                { prompt: '$', cmd: 'recon skills run pipeline-review' },
                { prompt: '', out: '✓ 47 deals scored · 3 flagged for risk' },
                { prompt: '$', cmd: 'recon audit log --since=24h' },
                { prompt: '', out: '◇ 142 agent actions · 0 anomalies', outClass: 'muted' },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer variant="product" productName="Recon" />
      <GsapClient />
    </div>
  );
}
