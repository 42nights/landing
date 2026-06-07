import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Wordmark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "Privacy Policy — 42nights",
  description:
    "How 42nights collects, uses, stores, and protects your data, including Google user data accessed via OAuth.",
};

const EFFECTIVE = "May 29, 2026";

export default function PrivacyPage() {
  return (
    <main>
      <Nav />
      <section className="relative mx-auto max-w-3xl px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-20">
        <h1 className="font-serif-display text-[40px] leading-[1.04] tracking-tight md:text-[60px]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-mutedSoft">Effective {EFFECTIVE}</p>

        <div className="prose-policy mt-12 space-y-10 text-[15px] leading-relaxed text-ink/80">
          <section>
            <p>
              This Privacy Policy explains how 42nights (&ldquo;42nights,&rdquo;
              &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              collects, uses, stores, shares, and protects information when you
              use our products and services (the &ldquo;Service&rdquo;). It also
              describes how we handle Google user data accessed through Google
              OAuth, in accordance with the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                className="underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:text-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , including its Limited Use requirements.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Information we collect
            </h2>
            <p className="mt-4">
              When you connect your Google account, we request access only to
              the data needed to provide the Service:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <span className="font-medium text-ink">Account identity.</span>{" "}
                Your name, email address, and profile information, used to
                authenticate you and identify your account.
              </li>
              <li>
                <span className="font-medium text-ink">Gmail data.</span> With
                your explicit authorization, the contents and metadata of your
                Gmail messages (such as senders, recipients, subjects, message
                bodies, and labels) needed to perform the actions you request.
              </li>
            </ul>
            <p className="mt-4">
              We only access Gmail data after you grant consent through
              Google&rsquo;s OAuth screen, and you may revoke this access at any
              time (see &ldquo;Revoking access and deleting data&rdquo; below).
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              How we use your data
            </h2>
            <p className="mt-4">
              We use Google user data solely to provide and improve the features
              you have asked us to perform on your behalf — for example,
              reading, organizing, drafting, sending, or acting on email within
              the Service. We do not use Google user data for advertising, and
              we do not sell it.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Limited Use disclosure
            </h2>
            <p className="mt-4">
              42nights&rsquo; use and transfer of information received from
              Google APIs to any other app will adhere to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
                className="underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:text-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements. Specifically, we do not:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                use Google user data for serving advertisements, or transfer it
                for that purpose;
              </li>
              <li>
                allow humans to read your Google user data, unless we first
                obtain your affirmative agreement to view specific messages, it
                is necessary for security purposes (such as investigating
                abuse), to comply with applicable law, or the data has been
                aggregated and anonymized;
              </li>
              <li>
                use or transfer Google user data to train generalized or
                third-party artificial-intelligence or machine-learning models;
              </li>
              <li>sell, rent, or lease Google user data to any third party.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Data storage and security
            </h2>
            <p className="mt-4">
              We store data on infrastructure protected by industry-standard
              safeguards, including encryption in transit and at rest. Access to
              Google user data is restricted to authorized personnel and systems
              that require it to operate the Service. We retain data only as
              long as needed to provide the Service or as required by law.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Sharing your data
            </h2>
            <p className="mt-4">
              We do not sell your data. We share Google user data only with
              service providers (sub-processors) that help us operate the
              Service, and only to the extent necessary, under contractual
              obligations consistent with this policy and the Google API
              Services User Data Policy. We may disclose data if required by law
              or to protect the rights, safety, and security of our users and
              the Service.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Revoking access and deleting data
            </h2>
            <p className="mt-4">
              You can revoke 42nights&rsquo; access to your Google account at
              any time from your{" "}
              <a
                href="https://myaccount.google.com/permissions"
                className="underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:text-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Account permissions page
              </a>
              . To request deletion of data we hold, email us at{" "}
              <a
                href="mailto:team@42nights.dev"
                className="underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:text-ink"
              >
                team@42nights.dev
              </a>{" "}
              and we will delete it within 30 days, except where retention is
              required by law.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Children&rsquo;s privacy
            </h2>
            <p className="mt-4">
              The Service is not directed to children under 13, and we do not
              knowingly collect personal information from them.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Changes to this policy
            </h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time. When we do,
              we will revise the &ldquo;Effective&rdquo; date above and, where
              appropriate, notify you.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl tracking-tight text-ink">
              Contact us
            </h2>
            <p className="mt-4">
              Questions about this policy or your data? Email{" "}
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
