import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "42nights",
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
  ],
};

// Runs before first paint to apply the theme, so there's no flash. Default
// follows the OS (prefers-color-scheme); an explicit saved choice overrides it.
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
