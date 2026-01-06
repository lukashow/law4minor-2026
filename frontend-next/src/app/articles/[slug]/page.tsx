import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { BACKEND_URL } from "@/lib/api";

// Process image URLs
function processImageUrl(url?: string): string {
  if (!url) return "/images/placeholder.png";
  return url.replace(new RegExp(`^${BACKEND_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), "").replace(/^https?:\/\/localhost:\d+/, "");
}

// Server-side data fetching
async function getArticle(slug: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/public/articles/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const article = await res.json();
      return {
        ...article,
        image: processImageUrl(article.image),
      };
    }
  } catch (err) {
    console.error("[SSR] Article fetch failed:", err);
  }
  return null;
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

// Render article content - handles HTML string or Lexical JSON
function renderContent(content: any) {
  if (!content) {
    return <p className="text-gray-500">No content available.</p>;
  }

  // If it's a string, render as HTML
  if (typeof content === "string") {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // If it's Lexical JSON format, try to render text from nodes
  if (content.root?.children) {
    return (
      <div>
        {content.root.children.map((node: any, i: number) => {
          if (node.type === "paragraph") {
            const text = node.children?.map((child: any) => child.text || "").join("") || "";
            return <p key={i}>{text}</p>;
          }
          if (node.type === "heading") {
            const text = node.children?.map((child: any) => child.text || "").join("") || "";
            // Use specific heading tags based on level
            if (node.tag === 1) return <h1 key={i}>{text}</h1>;
            if (node.tag === 3) return <h3 key={i}>{text}</h3>;
            return <h2 key={i}>{text}</h2>;
          }
          return null;
        })}
      </div>
    );
  }

  // Fallback: just render as string
  return <p>{String(content)}</p>;
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
                <span>
                  By {article.author.firstName} {article.author.lastName}
                </span>
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

      {/* Content */}
      <section className="container max-w-4xl py-12">
        <div className="prose prose-lg max-w-none">
          {article.excerpt && <p className="lead text-lg text-gray-600">{article.excerpt}</p>}

          {renderContent(article.content)}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h4 className="font-semibold text-[var(--color-primary)] mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: any) => (
                <a
                  key={tag.id || tag.slug || tag.name}
                  href={`/articles?tag=${tag.slug || tag.name}`}
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
