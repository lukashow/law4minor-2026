import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Law4Minor protects your privacy and handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 bg-paper">
      <div className="container max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-accent mb-8">Privacy Policy</h1>

        <div className="prose prose-lg text-gray-600">
          <p className="text-lg mb-6">Last updated: January 2026</p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you contact us, subscribe to our newsletter, or use our services.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, and to communicate with you about our programs and initiatives.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:contact@law4minor.org" className="text-accent hover:underline">
              contact@law4minor.org
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
