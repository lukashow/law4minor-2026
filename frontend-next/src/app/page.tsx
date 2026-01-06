import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { ValuesSection } from "@/components/landing/ValuesSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { ArticlesSection } from "@/components/landing/ArticlesSection";
import { RecognitionsSection } from "@/components/landing/RecognitionsSection";
import { CTASection } from "@/components/landing/CTASection";

// Process image URLs to be relative
function processImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return url.replace(/^https?:\/\/localhost:3001/, "");
}

// Server-side data fetching
async function getHomeData() {
  let articles: any[] = [];
  let team: any[] = [];

  try {
    const articlesRes = await fetch("http://localhost:3001/api/public/articles?perPage=3", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (articlesRes.ok) {
      const result = await articlesRes.json();
      const rawArticles = result.items || result || [];
      articles = rawArticles.map((article: any) => ({
        ...article,
        image: processImageUrl(article.image),
      }));
    }
  } catch (err) {
    console.error("[SSR] Articles fetch failed:", err);
  }

  try {
    const teamRes = await fetch("http://localhost:3001/api/public/team", {
      next: { revalidate: 60 },
    });
    if (teamRes.ok) {
      const rawTeam = await teamRes.json();
      team = (Array.isArray(rawTeam) ? rawTeam : []).map((member: any) => ({
        ...member,
        avatar: processImageUrl(member.avatar),
      }));
    }
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
      <TeamSection team={team} />
      <ArticlesSection articles={articles} />
      <CTASection />
    </>
  );
}
