import { useState } from 'react';
import { SEO } from '../components/SEO';
import { Icon } from '@iconify/react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="pt-24">
      <SEO 
        title="Contact Us"
        description="Get in touch with Law4Minor. Have questions about youth legal rights? Want to partner with us? We'd love to hear from you."
        url="/contact"
      />
      {/* Hero */}
      <section className="bg-[var(--color-primary)] py-16">
        <div className="container">
          <span className="text-[var(--color-accent)] text-sm font-medium uppercase tracking-wider">Get in Touch</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-4">
            Contact Us
          </h1>
          <p className="text-white/70 mt-4 max-w-xl">
            Have questions about youth legal rights? Want to partner with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-gray-600 mb-8">
                Whether you're a student seeking information, a school looking to partner, or an organization wanting to collaborate, we're here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                    <Icon icon="mdi:email" className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-primary)]">Email</h3>
                    <a href="mailto:contact@law4minor.org" className="text-gray-600 hover:text-[var(--color-accent)]">
                      contact@law4minor.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                    <Icon icon="mdi:map-marker" className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-primary)]">Location</h3>
                    <p className="text-gray-600">Malaysia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                    <Icon icon="mdi:instagram" className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-primary)]">Instagram</h3>
                    <a href="https://instagram.com/law4minor" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[var(--color-accent)]">
                      @law4minor
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--color-gray-50)] rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none transition-all resize-none"
                    required
                  />
                </div>
                <button type="submit" className="w-full btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
