import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Law4Minor services.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 bg-[var(--color-paper)]">
      <div className="container max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-accent)] mb-8">Terms of Service</h1>

        <div className="prose prose-lg text-gray-600">
          <p className="text-lg mb-6">Last updated: January 2026</p>

          <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mt-8 mb-4">2. Educational Purpose</h2>
          <p>
            The content on this website is for educational and informational purposes only. It is not intended to be legal advice. Consult a qualified lawyer for legal matters.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mt-8 mb-4">3. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and images, is the property of Law4Minor and protected by intellectual property laws.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            Law4Minor shall not be liable for any damages arising from the use or inability to use this website or its content.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mt-8 mb-4">5. Contact</h2>
          <p>
            For questions about these Terms, please contact us at{" "}
            <a href="mailto:contact@law4minor.org" className="text-[var(--color-accent)] hover:underline">
              contact@law4minor.org
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
