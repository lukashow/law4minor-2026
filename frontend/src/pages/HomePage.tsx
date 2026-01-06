import { HeroSection } from '../components/landing/HeroSection';
import { StatsSection } from '../components/landing/StatsSection';
import { ValuesSection } from '../components/landing/ValuesSection';
import { ServicesSection } from '../components/landing/ServicesSection';
import { TeamSection } from '../components/landing/TeamSection';
import { ArticlesSection } from '../components/landing/ArticlesSection';
import { RecognitionsSection } from '../components/landing/RecognitionsSection';
import { CTASection } from '../components/landing/CTASection';
import { SEO } from '../components/SEO';

export function HomePage() {
  return (
    <>
      <SEO 
        title="Home"
        description="Law4Minor empowers minors with legal knowledge. Learn about your rights as a minor in Malaysia through our articles, events, and resources."
        url="/"
      />
      <HeroSection />
      <StatsSection />
      <ValuesSection />
      <ServicesSection />
      <RecognitionsSection />
      <TeamSection />
      <ArticlesSection />
      <CTASection />
    </>
  );
}

