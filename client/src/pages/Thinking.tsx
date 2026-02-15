import { Layout } from "@/components/Layout";
import { PostList } from "@/components/PostList";
import { usePosts } from "@/hooks/use-content";
import { Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Thinking() {
  const { data: posts, isLoading, error } = usePosts('thinking');
  useScrollReveal([isLoading]);

  return (
    <Layout>
      <div className="space-y-12 md:space-y-20">
        <div className="space-y-4 animate-in-up">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">Thinking</h1>
          <p className="text-muted-foreground max-w-lg reveal">
            Essays on software design, philosophy, and building durable things in a disposable world.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-destructive py-10 font-mono text-sm">
            Error loading thoughts. Please try again.
          </div>
        ) : (
          <div className="delay-200 reveal">
            <PostList posts={posts || []} basePath="/thinking" />
          </div>
        )}
      </div>
      <div className="grain" />
    </Layout>
  );
}
