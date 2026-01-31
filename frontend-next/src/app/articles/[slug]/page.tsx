import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { fetchPostBySlug, Article } from "@/lib/api";

// Server-side data fetching using WordPress REST API
async function getArticle(slug: string): Promise<Article | null> {
  try {
    return await fetchPostBySlug(slug);
  } catch (err) {
    console.error("[SSR] Article fetch failed:", err);
    return null;
  }
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt || `Read ${article.title} on Law4Minor`,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : undefined,
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-[var(--color-paper)] py-16">
        <div className="container max-w-4xl">
          {article.category && (
            <span className="text-[var(--color-primary)] text-sm font-medium uppercase tracking-wider">
              {article.category.name}
            </span>
          )}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-accent)] mt-4 mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span>{formatDate(article.createdAt)}</span>
            {article.author && (
              <>
                <span>•</span>
                <span>By {article.author.name}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.image && (
        <section className="container max-w-4xl -mt-8">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={article.image}
              alt={article.title}
              width={900}
              height={506}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Content - WordPress provides HTML content */}
      <section className="container max-w-4xl py-12">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h4 className="font-semibold text-[var(--color-primary)] mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <a
                  key={tag.id}
                  href={`/articles?tag=${tag.slug}`}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                  {tag.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12">
          <a href="/articles" className="btn btn-outline">
            <Icon icon="mdi:arrow-left" className="w-4 h-4" />
            Back to Articles
          </a>
        </div>
      </section>
    </article>
  );
}
