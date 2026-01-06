export default function Page() {
  return (
    <div className="pt-24">
      <section className="bg-[var(--color-primary)] py-16">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Terms of Service
          </h1>
          <p className="text-white/70 mt-4">Last updated: January 2026</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-serif prose-headings:text-[var(--color-primary)]">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using the Law4Minor website, you accept and agree to be bound by these Terms of Service.
            </p>

            <h2>Use of Content</h2>
            <p>
              The content on this website is for educational purposes only and does not constitute legal advice. Always consult a qualified legal professional for specific legal matters.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, images, and graphics, is the property of Law4Minor and is protected by copyright laws.
            </p>

            <h2>User Conduct</h2>
            <p>
              Users agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Law4Minor shall not be liable for any damages arising from the use of this website or reliance on its content.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of any changes.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about these Terms of Service, contact us at contact@law4minor.org.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
