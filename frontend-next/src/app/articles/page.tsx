import { Metadata } from "next";
import { ArticlesClient } from "./ArticlesClient";
import { BACKEND_URL, processImageUrl } from "@/lib/api";

export const metadata: Metadata = {
  title: "Articles",
  description: "Explore our curated collection of articles on legal topics, youth rights, and stories from the legal world.",
};

// Server-side data fetching
async function getArticlesData() {
  let articles: any[] = [];
  let categories: any[] = [];

  try {
    const articlesRes = await fetch(`${BACKEND_URL}/api/public/articles`, {
      next: { revalidate: 60 },
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
    const categoriesRes = await fetch(`${BACKEND_URL}/api/public/categories`, {
      next: { revalidate: 60 },
    });
    if (categoriesRes.ok) {
      const result = await categoriesRes.json();
      categories = Array.isArray(result) ? result : result.items || [];
    }
  } catch (err) {
    console.error("[SSR] Categories fetch failed:", err);
  }

  return { articles, categories };
}

export default async function ArticlesPage() {
  const { articles, categories } = await getArticlesData();

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-primary)] pt-32 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-[var(--color-accent)] text-sm font-medium uppercase tracking-wider">Knowledge Hub</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-6">
              Articles
            </h1>
            <p className="text-lg text-white">
              Explore our curated collection of articles on legal topics for youth.
            </p>
          </div>
        </div>
      </section>

      <ArticlesClient articles={articles} categories={categories} />
    </>
  );
}
