export default function Page() {
  return (
    <div className="pt-24">
      <section className="bg-[var(--color-primary)] py-16">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="text-white/70 mt-4">Last updated: January 2026</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-serif prose-headings:text-[var(--color-primary)]">
            <h2>Introduction</h2>
            <p>
              Law4Minor ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul>
              <li>Name and contact information when you contact us</li>
              <li>Usage data when you visit our website</li>
              <li>Any information you voluntarily provide</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Respond to your inquiries</li>
              <li>Improve our website and services</li>
              <li>Send updates about our programs (with your consent)</li>
            </ul>

            <h2>Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at contact@law4minor.org.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
