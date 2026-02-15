import { useEffect } from "react";
import { useRoute } from "wouter";
import ReactMarkdown from "react-markdown";
import { Layout } from "@/components/Layout";
import { usePost } from "@/hooks/use-content";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface PostDetailProps {
  type: 'thinking' | 'kue';
}

export default function PostDetail({ type }: PostDetailProps) {
  const [match, params] = useRoute(`/${type}/:slug`);
  const slug = match ? params?.slug : "";
  const { data: post, isLoading, error } = usePost(slug || "");
  useScrollReveal([isLoading]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="flex flex-col items-start gap-4 py-20 animate-in-up">
          <h1 className="text-2xl font-mono">404 — Post Not Found</h1>
          <Link
            href={`/${type}`}
            className="text-sm font-mono text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            ← Back to {type === 'thinking' ? 'Thinking' : 'Kue'}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-2xl mx-auto w-full animate-in-up">
        <header className="mb-12 space-y-6">
          <Link
            href={`/${type}`}
            className="inline-flex items-center text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-4 group"
          >
            <ArrowLeft className="mr-2 h-3 w-3 group-hover:-translate-x-1 transition-transform" />
            BACK
          </Link>

          <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-balance leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground border-t border-border pt-6">
            <time>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
                : 'DRAFT'}
            </time>
            <span>/</span>
            <span className="uppercase">{type}</span>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none prose-headings:font-medium prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-a:decoration-1 hover:prose-a:decoration-2 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:bg-muted prose-code:px-1 prose-code:rounded-sm reveal">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="mt-20 pt-8 border-t border-border reveal">
          <p className="font-serif italic text-muted-foreground">
            Thanks for reading.
          </p>
        </div>
      </article>
      <div className="grain" />
    </Layout>
  );
}
