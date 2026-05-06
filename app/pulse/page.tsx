import type { Metadata } from 'next';
import Link from 'next/link';
import GsapClient from '@/components/GsapClient';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import Terminal from '@/components/Terminal';

export const metadata: Metadata = {
  title: 'Pulse — the GTM operating cockpit',
  description:
    'Identity-resolved CRM, scheduled agents, attribution and forecast — on infrastructure you control. Built on Recon, deployed by 42nights.',
  alternates: { canonical: '/pulse' },
  openGraph: {
    type: 'website',
    url: '/pulse',
    title: 'Pulse — GTM cockpit on your infra',
    description:
      'The operating layer between signal and revenue. Built on Recon, deployed by 42nights in four weeks.',
    siteName: '42nights',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulse — GTM cockpit on your infra',
    description:
      'The operating layer between signal and revenue. Built on Recon, deployed by 42nights in four weeks.',
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

export default function PulsePage() {
  return (
    <div data-theme="recon">
      <Nav active="pulse" />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" data-parallax="0.4" />
        <div className="hero-orb" aria-hidden="true" data-parallax="0.7" />
        <div className="hero-bg-word" aria-hidden="true" data-parallax="0.25">
          pulse
        </div>

        <div className="container hero-inner">
          <div className="hero-badge" data-reveal>
            <span className="ping" />
            <span>Pulse · Built on Recon · Deployed by 42nights</span>
          </div>

          <h1 className="hero-title">
            <span className="line">
              <span className="word">The</span> <span className="word">operating</span>{' '}
              <span className="word">layer</span>
            </span>
            <span className="line">
              <span className="word">between</span> <span className="word italic">signal</span>
            </span>
            <span className="line">
              <span className="word">and</span> <span className="word italic">revenue.</span>
            </span>
          </h1>
          <p className="hero-sub" data-reveal>
            Identity-resolved CRM, inbox-first sync, scheduled agents, forecast that ties to source.
            On infrastructure you control. Deployed by{' '}
            <Link className="inline-link" href="/">
              42nights
            </Link>{' '}
            in four weeks.
          </p>
          <p className="hero-audience" data-reveal>
            RevOps · Sales leadership · Growth ops · CROs
          </p>

          <div className="hero-cta" data-reveal>
            <a className="btn btn-primary" href="#cta" data-magnetic>
              <span>Book a Pulse deploy</span>
              <ArrowSm />
            </a>
            <Link className="btn btn-ghost" href="/recon">
              <span>See the platform</span>
            </Link>
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
              <span className="stat-num" data-counter="6">
                0
              </span>
              <span className="stat-label">GTM skill packs</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" data-counter="4">
                0
              </span>
              <span className="stat-label">week deploy</span>
            </div>
          </div>
        </div>

        <Marquee
          items={[
            'Salesforce',
            'HubSpot',
            'Apollo',
            'Clay',
            'Gmail',
            'Outlook',
            'Calendar',
            'LinkedIn',
            'PostHog',
            'Smartlead',
            'Instantly',
            'Slack',
          ]}
        />
      </section>

      {/* CAPABILITIES */}
      <section className="section" id="capabilities">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          01
        </div>
        <div className="container">
          <div className="section-head section-head-narrow">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              What Pulse does
            </div>
            <h2 className="section-title" data-split>
              From inbox<br />
              <em>to closed-won.</em>
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
              <h3>Per-account next-best-action</h3>
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
                <line x1="10" y1="80" x2="210" y2="80" stroke="rgba(255,255,255,0.15)" />
                <path d="M 10 78 C 50 78 80 50 110 42 C 140 34 170 30 210 22" stroke="var(--accent)" fill="none" strokeWidth="1.5" />
                <circle cx="10" cy="78" r="3" fill="var(--accent)" />
                <circle cx="60" cy="62" r="3" fill="var(--accent)" />
                <circle cx="110" cy="42" r="3" fill="var(--accent)" />
                <circle cx="160" cy="32" r="3" fill="var(--accent)" />
                <circle cx="210" cy="22" r="4" fill="var(--accent)" />
                <text x="110" y="92" textAnchor="middle" className="cap-label">forecast</text>
              </svg>
              <h3>Forecast that ties to source</h3>
              <p>Stage · owner · segment.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="section section-narrow" id="roadmap">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          02
        </div>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              Roadmap
            </div>
            <h2 className="section-title" data-split>
              Five phases<br />
              <em>per deployment.</em>
            </h2>
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
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM REFERENCE */}
      <section className="section section-narrow platform-ref">
        <div className="container">
          <div className="ref-card" data-reveal>
            <div className="ref-copy">
              <div className="eyebrow">
                <span className="dot" />
                Built on Recon
              </div>
              <h3>Same gateway. Same vault. Same audit log.</h3>
              <p>
                Pulse is a thin Next.js app over the Recon substrate. Your data plane, security
                model, and operator skills are the platform&apos;s — Pulse just wears the GTM chrome
                on top.
              </p>
              <Link className="btn btn-ghost" href="/recon">
                <span>See the Recon platform</span>
                <ArrowSm />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-sec" id="cta">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          03
        </div>
        <div className="container">
          <div className="cta-card" data-reveal>
            <div className="cta-copy">
              <div className="eyebrow">
                <span className="dot" />
                Get Pulse deployed
              </div>
              <h2 className="section-title" data-split>
                Four weeks to<br />
                <em>your own pipeline OS.</em>
              </h2>
              <p className="section-lede">
                42nights deploys Pulse inside your perimeter. Discovery on Monday, your team running
                it on the Friday of week four.
              </p>
              <div className="hero-cta">
                <a
                  className="btn btn-primary"
                  href="mailto:jerry@xiao.sh?subject=Pulse%20deploy"
                  data-magnetic
                >
                  <span>Book a deploy</span>
                  <ArrowSm />
                </a>
                <Link className="btn btn-ghost" href="/">
                  <span>About 42nights</span>
                </Link>
              </div>
            </div>

            <Terminal
              title="pulse · acme-prod"
              lines={[
                { prompt: '$', cmd: 'recon up --variant=pulse' },
                { prompt: '', out: '▲ workspace ready · auth via SSO', outClass: 'ok' },
                { prompt: '$', cmd: 'pulse connect hubspot --read-only' },
                { prompt: '', out: '✓ 4,212 contacts · 318 active deals indexed' },
                { prompt: '$', cmd: 'pulse skills run pipeline-review' },
                { prompt: '', out: '✓ 47 deals scored · 3 flagged for risk' },
                { prompt: '$', cmd: 'pulse forecast --segment=enterprise' },
                { prompt: '', out: '◇ Q2 weighted: $2.4M · vs plan: +112%', outClass: 'muted' },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer variant="product" productName="Pulse" />
      <GsapClient />
    </div>
  );
}
