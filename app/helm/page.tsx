import type { Metadata } from 'next';
import Link from 'next/link';
import GsapClient from '@/components/GsapClient';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import Terminal from '@/components/Terminal';

export const metadata: Metadata = {
  title: 'Helm — the portfolio operating cockpit',
  description:
    'KPI roll-ups across portcos, variance flags, board-pack agent. On infrastructure you control. Built on Recon, deployed by 42nights.',
  alternates: { canonical: '/helm' },
  openGraph: {
    type: 'website',
    url: '/helm',
    title: 'Helm — portfolio cockpit on your infra',
    description:
      'KPI roll-ups, variance flags, DD workspace, board-pack agent. Built on Recon, deployed by 42nights.',
    siteName: '42nights',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Helm — portfolio cockpit on your infra',
    description:
      'KPI roll-ups, variance flags, DD workspace, board-pack agent. Built on Recon, deployed by 42nights.',
  },
};

export const viewport = { themeColor: '#7ec5ff' };

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

export default function HelmPage() {
  return (
    <div data-theme="helm">
      <Nav active="helm" />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" data-parallax="0.4" />
        <div className="hero-orb" aria-hidden="true" data-parallax="0.7" />
        <div className="hero-bg-word" aria-hidden="true" data-parallax="0.25">
          helm
        </div>

        <div className="container hero-inner">
          <div className="hero-badge" data-reveal>
            <span className="ping" />
            <span>Helm · Built on Recon · Deployed by 42nights</span>
          </div>

          <h1 className="hero-title">
            <span className="line">
              <span className="word">A</span> <span className="word italic">portfolio</span>
            </span>
            <span className="line">
              <span className="word">cockpit</span> <span className="word">for</span>
            </span>
            <span className="line">
              <span className="word italic">holdcos</span> <span className="word">&amp;</span>{' '}
              <span className="word">PE.</span>
            </span>
          </h1>
          <p className="hero-sub" data-reveal>
            KPI roll-ups across portcos, variance flags, DD workspace, board-pack agent. On
            infrastructure you control. Deployed by{' '}
            <Link className="inline-link" href="/">
              42nights
            </Link>{' '}
            in four weeks.
          </p>
          <p className="hero-audience" data-reveal>
            Operating partners · COOs · Holdcos · Family offices · LP teams
          </p>

          <div className="hero-cta" data-reveal>
            <a className="btn btn-primary" href="#cta" data-magnetic>
              <span>Book a Helm deploy</span>
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
              <span className="stat-label">PE skill packs</span>
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
            'QuickBooks',
            'Xero',
            'NetSuite',
            'Stripe',
            'Plaid',
            'Rippling',
            'Gusto',
            'HubSpot',
            'Salesforce',
            'Carta',
            'Drive · Box · Docsend',
            'Notion',
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
              What Helm does
            </div>
            <h2 className="section-title" data-split>
              From portco<br />
              <em>to board pack.</em>
            </h2>
          </div>

          <div className="cap-grid" data-stagger>
            <article className="cap-tile">
              <svg className="cap-vis" viewBox="0 0 220 92" aria-hidden="true">
                <rect x="10" y="58" width="14" height="22" rx="2" fill="rgba(126,197,255,0.55)" />
                <rect x="30" y="44" width="14" height="36" rx="2" fill="rgba(126,197,255,0.55)" />
                <rect x="50" y="62" width="14" height="18" rx="2" fill="rgba(126,197,255,0.55)" />
                <rect x="70" y="36" width="14" height="44" rx="2" fill="rgba(126,197,255,0.55)" />
                <rect x="90" y="50" width="14" height="30" rx="2" fill="rgba(126,197,255,0.55)" />
                <text x="57" y="92" className="cap-label" textAnchor="middle">portcos</text>
                <line x1="120" y1="58" x2="148" y2="58" stroke="var(--accent)" strokeWidth="1.4" />
                <polyline points="142,53 148,58 142,63" stroke="var(--accent)" fill="none" strokeWidth="1.4" />
                <rect x="158" y="20" width="44" height="60" rx="5" fill="rgba(126,197,255,0.22)" stroke="var(--accent)" />
                <text x="180" y="92" className="cap-label" textAnchor="middle">holdco</text>
              </svg>
              <h3>KPI roll-ups</h3>
              <p>Portcos in. Dashboard out.</p>
            </article>

            <article className="cap-tile">
              <svg className="cap-vis" viewBox="0 0 220 92" aria-hidden="true">
                <line x1="10" y1="46" x2="210" y2="46" stroke="rgba(255,255,255,0.15)" strokeDasharray="2 4" />
                <text x="14" y="14" className="cap-label">plan</text>
                <text x="14" y="80" className="cap-label">actual</text>
                <path d="M 20 40 L 60 38 L 100 42 L 140 56 L 180 60 L 210 65" stroke="var(--accent)" strokeWidth="1.6" fill="none" />
                <circle cx="140" cy="56" r="5" fill="none" stroke="rgba(255,140,140,0.85)" strokeWidth="1.6" />
                <line x1="135" y1="51" x2="145" y2="61" stroke="rgba(255,140,140,0.85)" strokeWidth="1.5" />
                <line x1="145" y1="51" x2="135" y2="61" stroke="rgba(255,140,140,0.85)" strokeWidth="1.5" />
                <text x="148" y="40" className="cap-label-out" fill="rgba(255,140,140,0.9)">flag</text>
              </svg>
              <h3>Variance vs plan</h3>
              <p>Flagged. Drafted. Reviewed.</p>
            </article>

            <article className="cap-tile">
              <svg className="cap-vis" viewBox="0 0 220 92" aria-hidden="true">
                <rect x="0" y="6" width="32" height="14" rx="3" fill="rgba(255,255,255,0.06)" />
                <text x="36" y="17" className="cap-label">data room</text>
                <rect x="0" y="26" width="32" height="14" rx="3" fill="rgba(255,255,255,0.06)" />
                <text x="36" y="37" className="cap-label">CIM</text>
                <rect x="0" y="46" width="32" height="14" rx="3" fill="rgba(255,255,255,0.06)" />
                <text x="36" y="57" className="cap-label">model</text>
                <rect x="0" y="66" width="32" height="14" rx="3" fill="rgba(255,255,255,0.06)" />
                <text x="36" y="77" className="cap-label">notes</text>
                <path d="M 110 6 L 110 86" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 3" />
                <rect x="120" y="14" width="92" height="20" rx="4" fill="rgba(126,197,255,0.16)" stroke="var(--accent)" />
                <text x="166" y="28" className="cap-label-out" textAnchor="middle">DD workspace</text>
                <rect x="120" y="42" width="64" height="14" rx="3" fill="rgba(255,255,255,0.05)" />
                <text x="124" y="53" className="cap-label">checklist</text>
                <rect x="120" y="62" width="80" height="14" rx="3" fill="rgba(255,255,255,0.05)" />
                <text x="124" y="73" className="cap-label">risk flags</text>
              </svg>
              <h3>DD workspace generator</h3>
              <p>Per-deal. Auto-tagged.</p>
            </article>

            <article className="cap-tile">
              <svg className="cap-vis" viewBox="0 0 220 92" aria-hidden="true">
                <rect x="6" y="10" width="80" height="72" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
                <line x1="14" y1="22" x2="78" y2="22" stroke="rgba(255,255,255,0.15)" />
                <line x1="14" y1="32" x2="60" y2="32" stroke="rgba(255,255,255,0.15)" />
                <line x1="14" y1="42" x2="74" y2="42" stroke="rgba(255,255,255,0.15)" />
                <line x1="14" y1="52" x2="50" y2="52" stroke="rgba(255,255,255,0.15)" />
                <line x1="14" y1="62" x2="68" y2="62" stroke="rgba(255,255,255,0.15)" />
                <line x1="14" y1="72" x2="56" y2="72" stroke="rgba(255,255,255,0.15)" />
                <text x="46" y="92" className="cap-label" textAnchor="middle">notes</text>
                <line x1="92" y1="46" x2="124" y2="46" stroke="var(--accent)" strokeWidth="1.4" />
                <polyline points="118,41 124,46 118,51" stroke="var(--accent)" fill="none" strokeWidth="1.4" />
                <rect x="130" y="10" width="84" height="72" rx="4" fill="rgba(126,197,255,0.12)" stroke="var(--accent)" />
                <text x="172" y="38" className="cap-label-out" textAnchor="middle">BOARD</text>
                <text x="172" y="52" className="cap-label-out" textAnchor="middle">PACK</text>
                <text x="172" y="92" className="cap-label" textAnchor="middle">board ready</text>
              </svg>
              <h3>Board-pack agent</h3>
              <p>Notes in. Pack out.</p>
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
              <div className="rm-panels active" data-roadmap-panel="helm">
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
                Helm is a thin Next.js app over the Recon substrate. Each portco is a scoped
                workspace; the holdco view is a read-only roll-up. Same security posture, same audit
                trail.
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
                Get Helm deployed
              </div>
              <h2 className="section-title" data-split>
                Four weeks to<br />
                <em>a holdco cockpit.</em>
              </h2>
              <p className="section-lede">
                42nights deploys Helm inside your perimeter — one workspace per portco, holdco view
                rolling up. Discovery to running in four weeks.
              </p>
              <div className="hero-cta">
                <a
                  className="btn btn-primary"
                  href="mailto:jerry@xiao.sh?subject=Helm%20deploy"
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
              title="helm · pinemark-holdco"
              lines={[
                { prompt: '$', cmd: 'recon up --variant=helm' },
                { prompt: '', out: '▲ holdco workspace ready · 7 portcos scoped', outClass: 'ok' },
                { prompt: '$', cmd: 'helm ingest --kpi --portco=northstar' },
                { prompt: '', out: '✓ QB · Stripe · HRIS · 14 KPIs synced' },
                { prompt: '$', cmd: 'helm variance --period=Q2 --vs=plan' },
                { prompt: '', out: '◇ 3 portcos flagged · 12 commentary drafts' },
                { prompt: '$', cmd: 'helm board-pack --period=Q2 --portco=all' },
                { prompt: '', out: '◇ pack drafted · 38 pages · awaiting review', outClass: 'muted' },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer variant="product" productName="Helm" />
      <GsapClient />
    </div>
  );
}
