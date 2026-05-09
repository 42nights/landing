import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "42nights — An AI chief-of-staff for your company",
  description:
    "We embed as engineers, learn how your company runs, and ship a closed-loop agent that takes action — not just suggestions.",
  openGraph: {
    title: "42nights — An AI chief-of-staff for your company",
    description:
      "Closed-loop AI agent for engineering and operations teams at funded software startups.",
    type: "website",
    url: "https://42nights.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "42nights",
    description: "An AI chief-of-staff for your company.",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

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
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500;1,9..144,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
