import { Metadata } from "next";
import { ArticlesClient } from "./ArticlesClient";
import { fetchPosts, fetchCategories, Article, Category } from "@/lib/api";

export const metadata: Metadata = {
  title: "Articles",
  description: "Explore our curated collection of articles on legal topics, youth rights, and stories from the legal world.",
};

// Server-side data fetching using WordPress REST API
async function getArticlesData() {
  let articles: Article[] = [];
  let categories: Category[] = [];

  try {
    // Fetch all articles from WordPress
    articles = await fetchPosts({ perPage: 100 });
  } catch (err) {
    console.error("[SSR] Articles fetch failed:", err);
  }

  try {
    // Fetch categories from WordPress
    categories = await fetchCategories();
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
