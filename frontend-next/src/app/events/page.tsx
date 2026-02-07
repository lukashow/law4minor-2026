import { Metadata } from "next";
import { Icon } from "@iconify/react";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover workshops, webinars, and community gatherings designed to empower you with legal knowledge.",
};

export default async function EventsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-paper pt-32 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Upcoming</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-accent mt-2 mb-6">
              Events & Programs
            </h1>
            <p className="text-lg text-gray-600">
              Join our workshops, webinars, and community gatherings designed to empower you with legal knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="section bg-paper">
        <div className="container">
          <div className="text-center py-16">
            <Icon icon="mdi:calendar-clock" className="w-20 h-20 mx-auto text-primary mb-6" />
            <h3 className="text-2xl font-serif font-bold text-accent mb-4">Stay Tuned!</h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-8">
              We&apos;re working on exciting upcoming events. Follow us on social media or check back soon for updates on workshops, webinars, and community gatherings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.instagram.com/law4minor/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Icon icon="mdi:instagram" className="w-5 h-5" />
                Follow on Instagram
              </a>
              <a 
                href="/contact" 
                className="btn btn-outline"
              >
                <Icon icon="mdi:email-outline" className="w-5 h-5" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
