import Link from 'next/link';
import RadarMark from './RadarMark';

export type NavPage = 'studio' | 'recon' | 'pulse' | 'helm';

interface Props {
  active: NavPage;
}

const ArrowIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export default function Nav({ active }: Props) {
  const isStudio = active === 'studio';
  const denim = active !== 'recon';
  const brandLabel = isStudio ? '42nights' : `42nights / ${active}`;
  const ctaLabel = isStudio ? 'Book a discovery' : 'Book a deploy';
  const ctaHref = isStudio ? '#contact' : '#cta';

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <Link href="/" className="nav-brand" aria-label="42nights home">
          <span className={`brand-mark${denim ? ' denim' : ''}`}>
            <RadarMark />
          </span>
          <span className="brand-name">{brandLabel}</span>
        </Link>

        <ul className="nav-links" role="list">
          {isStudio ? (
            <>
              <li>
                <a className="nav-link" href="#approach" data-nav>
                  Approach
                </a>
              </li>
              <li>
                <a className="nav-link" href="#products" data-nav>
                  Products
                </a>
              </li>
              <li>
                <a className="nav-link" href="#engagement" data-nav>
                  Engagement
                </a>
              </li>
              <li>
                <a className="nav-link" href="#contact" data-nav>
                  Contact
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className={`nav-link${active === 'recon' ? ' is-active' : ''}`}
                  href="/recon"
                  data-nav
                >
                  Recon
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link${active === 'pulse' ? ' is-active' : ''}`}
                  href="/pulse"
                  data-nav
                >
                  Pulse
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link${active === 'helm' ? ' is-active' : ''}`}
                  href="/helm"
                  data-nav
                >
                  Helm
                </Link>
              </li>
              <li>
                <Link className="nav-link" href="/" data-nav>
                  Studio
                </Link>
              </li>
            </>
          )}
          <span className="nav-indicator" aria-hidden="true" />
        </ul>

        <div className="nav-actions">
          <a className="nav-cta" href={ctaHref} data-magnetic>
            <span>{ctaLabel}</span>
            <ArrowIcon />
          </a>
        </div>
      </nav>
    </header>
  );
}
