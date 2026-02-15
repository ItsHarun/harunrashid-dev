import { Layout } from "@/components/Layout";
import { PostList } from "@/components/PostList";
import { usePosts } from "@/hooks/use-content";
import { Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Kue() {
  const { data: posts, isLoading, error } = usePosts('kue');
  useScrollReveal([isLoading]);

  return (
    <Layout>
      <div className="space-y-12 md:space-y-20">
        <div className="space-y-6 animate-in-up max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">Kue</h1>
          <div className="prose prose-neutral dark:prose-invert prose-lg text-muted-foreground leading-relaxed reveal">
            <p>
              Kue is not just a product; it is a living case study in sustainable software development.
              We are building a queue system that respects the user's time and attention.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-destructive py-10 font-mono text-sm">
            Error loading updates. Please try again.
          </div>
        ) : (
          <div className="delay-200 reveal">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Development Log
            </div>
            <PostList posts={posts || []} basePath="/kue" />
          </div>
        )}
      </div>
      <div className="grain" />
    </Layout>
  );
}
