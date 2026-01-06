import { usePageContext } from 'vike-react/usePageContext'
import { HeroSection } from '../../src/components/landing/HeroSection'
import { StatsSection } from '../../src/components/landing/StatsSection'
import { ValuesSection } from '../../src/components/landing/ValuesSection'
import { ServicesSection } from '../../src/components/landing/ServicesSection'
import { TeamSection } from '../../src/components/landing/TeamSection'
import { ArticlesSection } from '../../src/components/landing/ArticlesSection'
import { RecognitionsSection } from '../../src/components/landing/RecognitionsSection'
import { CTASection } from '../../src/components/landing/CTASection'

export default function Page() {
  const pageContext = usePageContext() as any
  const articles = pageContext.data?.articles || []
  const team = pageContext.data?.team || []

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ValuesSection />
      <ServicesSection />
      <RecognitionsSection />
      <TeamSection team={team} />
      <ArticlesSection articles={articles} />
      <CTASection />
    </>
  )
}
