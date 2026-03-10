import { FadeIn } from "@/components/FadeIn";
import { ExternalLink } from "lucide-react";

interface Post {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

function extractTag(xml: string, tag: string): string {
  const re = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`,
    "i"
  );
  return xml.match(re)?.[1]?.trim() ?? "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(raw: string): string {
  try {
    return new Date(raw).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://jacyjason.substack.com/feed", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
    return items.slice(0, 3).map((item) => {
      const description = stripHtml(extractTag(item, "description")).slice(
        0,
        120
      );
      return {
        title: extractTag(item, "title"),
        link: extractTag(item, "link"),
        pubDate: formatDate(extractTag(item, "pubDate")),
        description: description + (description.length >= 120 ? "…" : ""),
      };
    });
  } catch {
    return [];
  }
}

export async function BlogSection() {
  const posts = await getPosts();
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="relative bg-black px-6 py-24 text-white">
      <FadeIn className="relative z-10 mx-auto max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Writing
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl">From the blog</h2>
          <p className="text-white/70">
            Thoughts on building, research, and whatever else is on my mind.
          </p>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold leading-snug group-hover:text-white/90">
                  {post.title}
                </h3>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs text-white/40">{post.pubDate}</span>
                  <ExternalLink
                    size={13}
                    className="text-white/20 transition group-hover:text-white/50"
                  />
                </div>
              </div>
              {post.description && (
                <p className="text-sm text-white/50">{post.description}</p>
              )}
              <span className="text-xs text-white/30 underline underline-offset-2 group-hover:text-white/50">
                Read on Substack →
              </span>
            </a>
          ))}
        </div>
        <div className="text-center">
          <a
            href="https://jacyjason.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white/60 transition hover:border-white/40 hover:text-white"
          >
            All posts on Substack
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
