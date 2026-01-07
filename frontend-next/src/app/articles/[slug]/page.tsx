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
	console.log(content);
  if (!content) return <p className="text-gray-500">No content available.</p>;
  if (typeof content === "string") return <div dangerouslySetInnerHTML={{ __html: content }} />;

  // Recursive helper to get text from any depth (Text nodes, Paragraphs in Quotes, etc.)
  const getNestedText = (node: any): string => {
    if (node.text) return node.text;
    if (node.children) {
      return node.children.map((child: any) => getNestedText(child)).join("");
    }
    return "";
  };



  if (content.root?.children) {
    return (
      <div>
        {content.root.children.map((node: any, i: number) => {
          const text = getNestedText(node);

          // 1. Handle Paragraphs
          if (node.type === "paragraph") {
            return <p key={i}>{text}</p>;
          }

          // 2. Handle Headings
          if (node.type === "heading") {
            const Tag = node.tag === "h1" ? "h1" : node.tag === "h3" ? "h3" : "h2";
            return <Tag key={i}>{text}</Tag>;
          }

          // 3. Handle Quotes (using the nested logic from earlier)
          if (node.type === "quote") {
            return (
              <blockquote key={i} className="border-l-4 border-primary pl-6 italic my-6">
                {text}
              </blockquote>
            );
          }

          // 4. Handle Lists (ol and ul)
          if (node.type === "list") {
            const ListTag = node.tag === "ol" ? "ol" : "ul";
            return (
              <ListTag key={i} className={ListTag === "ol" ? "list-decimal ml-6" : "list-disc ml-6"}>
                {node.children?.map((listItem: any, j: number) => (
                  <li key={j}>{getNestedText(listItem)}</li>
                ))}
              </ListTag>
            );
          }

          return null;
        })}
      </div>
    );
  }

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
