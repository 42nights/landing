import type { Metadata } from 'next';
import Link from 'next/link';
import GsapClient from '@/components/GsapClient';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import Terminal from '@/components/Terminal';

export const metadata: Metadata = {
  title: '42nights — engineering studio · SF',
  description:
    'An in-person engineering studio. We embed for four weeks, ship Recon (or Pulse, or Helm) on your infrastructure, and hand the keys to your team.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: '42nights — engineering studio · SF',
    description:
      'We embed for four weeks and ship the operating layer that runs your business — inside your perimeter.',
    siteName: '42nights',
  },
  twitter: {
    card: 'summary_large_image',
    title: '42nights — engineering studio · SF',
    description:
      'We embed for four weeks and ship the operating layer that runs your business — inside your perimeter.',
  },
};

export const viewport = { themeColor: '#7892bd' };

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

export default function StudioPage() {
  return (
    <div data-theme="agency">
      <Nav active="studio" />

      {/* HERO */}
      <section className="hero studio-hero" id="top">
        <div className="hero-grid" aria-hidden="true" data-parallax="0.4" />
        <div className="hero-orb" aria-hidden="true" data-parallax="0.7" />
        <div className="hero-bg-word" aria-hidden="true" data-parallax="0.25">
          42n
        </div>

        <div className="container hero-inner studio-inner">
          <div className="hero-badge" data-reveal>
            <span className="ping" />
            <span>Engineering studio · SF + on-site · est. ’24</span>
          </div>

          <h1 className="hero-title studio-title">
            <span className="line">
              <span className="word">We</span> <span className="word italic">embed</span>
            </span>
            <span className="line">
              <span className="word">inside</span> <span className="word">your</span>{' '}
              <span className="word">team</span>
            </span>
            <span className="line">
              <span className="word">and</span> <span className="word">ship</span>{' '}
              <span className="word">the</span>
            </span>
            <span className="line">
              <span className="word italic">operating</span>{' '}
              <span className="word italic">layer</span>
            </span>
            <span className="line">
              <span className="word">that</span> <span className="word">runs</span>{' '}
              <span className="word">your</span> <span className="word">business.</span>
            </span>
          </h1>

          <p className="hero-sub studio-sub" data-reveal>
            42nights is a four-week, on-site engineering studio. We deploy{' '}
            <Link className="inline-link" href="/recon">
              Recon
            </Link>{' '}
            — and its variants{' '}
            <Link className="inline-link" href="/pulse">
              Pulse
            </Link>{' '}
            for revenue teams and{' '}
            <Link className="inline-link helm-link" href="/helm">
              Helm
            </Link>{' '}
            for portfolio teams — inside your perimeter, then hand the keys to your operators.
          </p>

          <div className="hero-cta" data-reveal>
            <a className="btn btn-primary" href="#contact" data-magnetic>
              <span>Book a discovery</span>
              <ArrowSm />
            </a>
            <a className="btn btn-ghost" href="#approach">
              <span>How we work</span>
            </a>
          </div>

          <div className="hero-stats studio-stats" data-reveal>
            <div className="stat">
              <span className="stat-num" data-counter="4">
                0
              </span>
              <span className="stat-label">week engagement</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" data-counter="100">
                0
              </span>
              <span className="stat-label">% on your infra</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" data-counter="3">
                0
              </span>
              <span className="stat-label">products deployed</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" data-counter="90">
                0
              </span>
              <span className="stat-label">day post-deploy support</span>
            </div>
          </div>
        </div>

        <Marquee
          items={[
            'Holding companies',
            'Series B → late-stage',
            'RevOps',
            'Operating partners',
            'Family offices',
            'Holdcos',
            'Sales leadership',
            'COOs',
            'Studio of three',
            'SF + on-site',
          ]}
        />
      </section>

      {/* APPROACH */}
      <section className="section section-narrow" id="approach">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          01
        </div>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              Approach
            </div>
            <h2 className="section-title" data-split>
              Four weeks. <em>On site.</em>
              <br />
              Then it&apos;s yours.
            </h2>
            <p className="section-lede" data-reveal>
              We don&apos;t write a deck and disappear. We sit at your desk, watch your operators
              work, and ship the system that fits — then we leave.
            </p>
          </div>

          <ol className="process-list" data-stagger role="list">
            <li className="process-row">
              <span className="pr-week">W1</span>
              <div className="pr-body">
                <h3>Discovery on the ground.</h3>
                <p>
                  One week shadowing your team. We map workflows, identify which pieces of Recon
                  (or Pulse / Helm) fit, and write the deployment plan with you.
                </p>
              </div>
              <span className="pr-out">scope &amp; plan</span>
            </li>
            <li className="process-row">
              <span className="pr-week">W2</span>
              <div className="pr-body">
                <h3>Deploy the substrate.</h3>
                <p>
                  Recon goes inside your VPC, on-prem, or air-gapped — whichever your security
                  review demands. Identity, vault, gateway, audit log, all live by end of week.
                </p>
              </div>
              <span className="pr-out">platform live</span>
            </li>
            <li className="process-row">
              <span className="pr-week">W3</span>
              <div className="pr-body">
                <h3>Ship the surface.</h3>
                <p>
                  Pulse for revenue, Helm for portfolio, or a custom variant. Your data is wired,
                  your skills are tuned, your operators are running real workflows by Friday.
                </p>
              </div>
              <span className="pr-out">surface running</span>
            </li>
            <li className="process-row">
              <span className="pr-week">W4</span>
              <div className="pr-body">
                <h3>Hand off.</h3>
                <p>
                  Train your team, document the deploy, transfer source escrow, set up the 90-day
                  support cadence. We leave on Friday. The platform stays.
                </p>
              </div>
              <span className="pr-out">team owns it</span>
            </li>
          </ol>
        </div>
      </section>

      {/* PRODUCTS WE DEPLOY */}
      <section className="section" id="products">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          02
        </div>
        <div className="container">
          <div className="section-head section-head-narrow">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              What we ship
            </div>
            <h2 className="section-title" data-split>
              One platform.
              <br />
              <em>Two specialized cockpits.</em>
            </h2>
            <p className="section-lede" data-reveal>
              We built Recon ourselves. Pulse and Helm wrap it for revenue and portfolio teams
              respectively. We deploy whichever fits — and we&apos;ll fork a custom variant if
              neither does.
            </p>
          </div>

          <div className="studio-products" data-stagger>
            <Link className="sp-card sp-recon" href="/recon">
              <div className="sp-head">
                <span className="sp-badge">platform</span>
                <span className="sp-arrow" aria-hidden="true">
                  →
                </span>
              </div>
              <h3 className="sp-name">Recon</h3>
              <p className="sp-tag">
                The substrate. Self-hosted gateway, identity vault, agent runtime, audit log.
              </p>
              <ul className="sp-meta" role="list">
                <li>Common to both</li>
                <li>Lives inside your perimeter</li>
                <li>Forkable</li>
              </ul>
            </Link>
            <Link className="sp-card sp-pulse" href="/pulse">
              <div className="sp-head">
                <span className="sp-badge accent">GTM</span>
                <span className="sp-arrow" aria-hidden="true">
                  →
                </span>
              </div>
              <h3 className="sp-name">Pulse</h3>
              <p className="sp-tag">
                Revenue cockpit. Identity-resolved CRM, scheduled agents, attribution, forecast.
              </p>
              <ul className="sp-meta" role="list">
                <li>RevOps · Sales · Growth</li>
                <li>Inbox-first</li>
                <li>Agent-driven outbound</li>
              </ul>
            </Link>
            <Link className="sp-card sp-helm" href="/helm">
              <div className="sp-head">
                <span className="sp-badge helm">PE</span>
                <span className="sp-arrow" aria-hidden="true">
                  →
                </span>
              </div>
              <h3 className="sp-name">Helm</h3>
              <p className="sp-tag">
                Portfolio cockpit. KPI roll-ups, variance flags, DD workspace, board-pack agent.
              </p>
              <ul className="sp-meta" role="list">
                <li>Operating partners · Holdcos</li>
                <li>Per-portco scoping</li>
                <li>SOC2-ready trail</li>
              </ul>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section section-narrow" id="why">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          03
        </div>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              Why 42nights
            </div>
            <h2 className="section-title" data-split>
              Operator-led.
              <br />
              Source-available. <em>On-site.</em>
            </h2>
          </div>

          <ol className="reason-list" data-stagger role="list">
            <li className="reason-row">
              <span className="rr-num">①</span>
              <div className="rr-body">
                <h3>We built the thing we deploy.</h3>
                <p>
                  Recon is ours. When something doesn&apos;t fit your stack, we change the
                  substrate, not the contract.
                </p>
              </div>
            </li>
            <li className="reason-row">
              <span className="rr-num">②</span>
              <div className="rr-body">
                <h3>Sovereignty is the default, not an upgrade.</h3>
                <p>
                  Single-tenant by definition. Your VPC, your keys, your audit log. We pass your
                  security review on day one.
                </p>
              </div>
            </li>
            <li className="reason-row">
              <span className="rr-num">③</span>
              <div className="rr-body">
                <h3>Hands-on, not advisory.</h3>
                <p>
                  We deploy and operate alongside your team — not in a slide deck from a thousand
                  miles away. The handoff is real.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="section section-narrow" id="engagement">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          04
        </div>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow" data-reveal>
              <span className="dot" />
              Engagement
            </div>
            <h2 className="section-title" data-split>
              Fixed-fee. <em>In person.</em>
              <br />
              Source escrow.
            </h2>
          </div>

          <dl className="terms-table" data-stagger>
            <div className="tt-row">
              <dt>Format</dt>
              <dd>
                Four-week minimum, fully on-site at your office. Two engineers from us, embedded
                with your operators.
              </dd>
            </div>
            <div className="tt-row">
              <dt>Fee</dt>
              <dd>
                Fixed-fee per engagement, scoped in week one. No hourly billing, no out-of-scope
                creep.
              </dd>
            </div>
            <div className="tt-row">
              <dt>IP</dt>
              <dd>
                Source escrow at deploy. Custom skill packs are yours. Recon core stays under our
                license, available to you in perpetuity for that deployment.
              </dd>
            </div>
            <div className="tt-row">
              <dt>Support</dt>
              <dd>
                Ninety days post-deploy on retainer — priority Slack, weekly check-ins, hot-fixes
                within 24 hours.
              </dd>
            </div>
            <div className="tt-row">
              <dt>Capacity</dt>
              <dd>Three active engagements at a time, max. We&apos;re a studio, not a body shop.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section cta-sec" id="contact">
        <div className="bg-numeral" aria-hidden="true" data-parallax="0.35">
          05
        </div>
        <div className="container">
          <div className="contact-card" data-reveal>
            <div className="cta-copy">
              <div className="eyebrow">
                <span className="dot" />
                Get started
              </div>
              <h2 className="section-title" data-split>
                Tell us what you&apos;re
                <br />
                <em>trying to ship.</em>
              </h2>
              <p className="section-lede">
                We&apos;ll come to you for an hour. Bring your most painful workflow, the data flow
                you can&apos;t get a SaaS to touch, or the security review that keeps killing your
                ops tooling. We&apos;ll tell you whether we&apos;re the right team — honestly —
                within the week.
              </p>
              <div className="hero-cta">
                <a
                  className="btn btn-primary"
                  href="mailto:jerry@xiao.sh?subject=42nights%20discovery"
                  data-magnetic
                >
                  <span>Book a discovery</span>
                  <ArrowSm />
                </a>
                <Link className="btn btn-ghost" href="/recon">
                  <span>See the platform</span>
                </Link>
              </div>
              <p className="contact-detail">
                <span>jerry@xiao.sh</span> · <span>SF, on-site continental US &amp; EMEA</span>
              </p>
            </div>

            <Terminal
              title="42nights · discovery.log"
              lines={[
                { prompt: '▶', cmd: 'W1: discovery on the ground' },
                { prompt: '', out: '↳ shadow ops · map workflows · scope plan' },
                { prompt: '▶', cmd: 'W2: deploy substrate' },
                { prompt: '', out: '↳ recon up · vault sealed · audit log signed' },
                { prompt: '▶', cmd: 'W3: ship the surface' },
                { prompt: '', out: '↳ pulse | helm | custom · skills tuned' },
                { prompt: '▶', cmd: 'W4: hand off · team owns it' },
                { prompt: '', out: '✓ deployed · 90-day retainer active', outClass: 'ok' },
              ]}
            />
          </div>
        </div>
      </section>

      <Footer variant="studio" />
      <GsapClient />
    </div>
  );
}
