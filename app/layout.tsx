import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://42nights.dev'),
  title: { default: '42nights', template: '%s · 42nights' },
  description: '42nights deploys AI operating layers inside your perimeter.',
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  themeColor: '#7892bd',
};

const fontHref =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={fontHref} />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        <div className="spotlight" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
