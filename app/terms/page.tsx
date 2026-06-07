import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Wordmark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "Terms of Service — 42nights",
  description:
    "The terms governing your use of 42nights products and services.",
};

const EFFECTIVE = "May 29, 2026";

export default function TermsPage() {
  return (
    <main>
      <Nav />
      <section className="relative mx-auto max-w-3xl px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-20">
        <h1 className="font-serif-display text-[40px] leading-[1.04] tracking-tight md:text-[60px]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-mutedSoft">Effective {EFFECTIVE}</p>

        <div className="prose-policy mt-12 space-y-10 text-[15px] leading-relaxed text-ink/80">
          <section>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
              and use of the products, websites, and services (the
              &ldquo;Service&rdquo;) provided by 42nights
              (&ldquo;42nights,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;). By accessing or using the Service, you agree
              to be bound by these Terms. If you do not agree, do not use the
              Service.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Eligibility and accounts
            </h2>
            <p className="mt-4">
              You must be at least 13 years old, and have the authority to enter
              into these Terms, to use the Service. You are responsible for
              maintaining the security of your account and for all activity that
              occurs under it. Notify us promptly of any unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Use of the Service
            </h2>
            <p className="mt-4">
              We grant you a limited, non-exclusive, non-transferable, revocable
              right to use the Service in accordance with these Terms. You agree
              not to:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                use the Service in violation of any applicable law or
                third-party rights;
              </li>
              <li>
                reverse engineer, copy, or create derivative works of the
                Service except as permitted by law;
              </li>
              <li>
                interfere with, disrupt, or attempt to gain unauthorized access
                to the Service or its systems;
              </li>
              <li>
                use the Service to transmit malware, spam, or unlawful, harmful,
                or infringing content.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Third-party services
            </h2>
            <p className="mt-4">
              The Service may integrate with third-party services, including
              Google. Your use of those services is governed by their own terms
              and policies. When you connect a Google account, you also
              authorize us to access data as described in our{" "}
              <a
                href="/privacy"
                className="underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:text-ink"
              >
                Privacy Policy
              </a>
              . We are not responsible for third-party services.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Your content
            </h2>
            <p className="mt-4">
              You retain ownership of content you submit to or access through
              the Service. You grant us the limited rights necessary to operate
              and provide the Service to you. You are responsible for ensuring
              you have the rights to any content you provide.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Fees and payment
            </h2>
            <p className="mt-4">
              Paid features are billed as described at the time of purchase.
              Unless otherwise stated, fees are non-refundable. We may change
              pricing on a prospective basis with notice.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Disclaimers
            </h2>
            <p className="mt-4">
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as
              available,&rdquo; without warranties of any kind, whether express
              or implied, including warranties of merchantability, fitness for a
              particular purpose, and non-infringement. We do not warrant that
              the Service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Limitation of liability
            </h2>
            <p className="mt-4">
              To the maximum extent permitted by law, 42nights will not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or data, arising from or
              related to your use of the Service. Our total liability for any
              claim will not exceed the amount you paid us in the twelve months
              preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Termination
            </h2>
            <p className="mt-4">
              You may stop using the Service at any time. We may suspend or
              terminate your access if you violate these Terms or if necessary
              to protect the Service or its users. Provisions that by their
              nature should survive termination will survive.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Changes to these Terms
            </h2>
            <p className="mt-4">
              We may update these Terms from time to time. When we do, we will
              revise the &ldquo;Effective&rdquo; date above. Your continued use
              of the Service after changes take effect constitutes acceptance of
              the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Contact us
            </h2>
            <p className="mt-4">
              Questions about these Terms? Email{" "}
              <a
                href="mailto:team@42nights.dev"
                className="underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:text-ink"
              >
                team@42nights.dev
              </a>
              .
            </p>
          </section>
        </div>
      </section>

      <footer className="border-t border-black/10">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-mutedSoft md:flex-row md:px-10">
          <Wordmark className="text-base" />
          <a
            href="mailto:team@42nights.dev"
            className="text-mutedSoft transition-[color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-ink"
          >
            team@42nights.dev
          </a>
          <span>© 2026</span>
        </div>
      </footer>
    </main>
  );
}
