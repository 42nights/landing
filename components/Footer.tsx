import Link from 'next/link';

interface Props {
  variant?: 'studio' | 'product';
  productName?: 'Recon' | 'Pulse' | 'Helm';
}

export default function Footer({ variant = 'product', productName = 'Recon' }: Props) {
  const isStudio = variant === 'studio';

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          {isStudio ? (
            <>
              <div className="brand-mark denim">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span>42nights · engineering studio · SF</span>
            </>
          ) : (
            <span>
              {productName} · built &amp; deployed by <Link href="/">42nights</Link>
            </span>
          )}
        </div>
        <div className="footer-links">
          <Link href="/">Studio</Link>
          <Link href="/recon">Recon</Link>
          <Link href="/pulse">Pulse</Link>
          <Link href="/helm">Helm</Link>
          <a href="mailto:jerry@xiao.sh">Contact</a>
        </div>
      </div>
    </footer>
  );
}
