import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { ValuesSection } from "@/components/landing/ValuesSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { ArticlesSection } from "@/components/landing/ArticlesSection";
import { RecognitionsSection } from "@/components/landing/RecognitionsSection";
import { CTASection } from "@/components/landing/CTASection";
import { fetchPosts, fetchTeamMembers, Article, TeamMember } from "@/lib/api";

// Server-side data fetching using WordPress REST API
async function getHomeData() {
  let articles: Article[] = [];
  let team: TeamMember[] = [];

  try {
    // Fetch latest 3 articles from WordPress
    articles = await fetchPosts({ perPage: 3 });
  } catch (err) {
    console.error("[SSR] Articles fetch failed:", err);
  }

  try {
    // Fetch team members from WordPress users
    team = await fetchTeamMembers();
  } catch (err) {
    console.error("[SSR] Team fetch failed:", err);
  }

  return { articles, team };
}

export default async function HomePage() {
  const { articles, team } = await getHomeData();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ValuesSection />
      <ServicesSection />
      <RecognitionsSection />
      <ArticlesSection articles={articles} />
      <CTASection />
    </>
  );
}
