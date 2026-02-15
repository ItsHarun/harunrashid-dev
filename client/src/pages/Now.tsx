import { Layout } from "@/components/Layout";
import { useNowUpdates } from "@/hooks/use-content";
import { Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Now() {
  const { data: updates, isLoading, error } = useNowUpdates();
  useScrollReveal([isLoading]);

  return (
    <Layout>
      <div className="space-y-12 md:space-y-20">
        <div className="space-y-4 animate-in-up">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">Now</h1>
          <p className="text-muted-foreground max-w-lg reveal">
            What I'm focused on, right now. Inspired by <a href="https://nownownow.com" target="_blank" className="underline underline-offset-4 decoration-1 hover:text-foreground transition-colors">Derek Sivers</a>.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-destructive py-10 font-mono text-sm">
            Error loading updates.
          </div>
        ) : (
          <div className="space-y-12 delay-200 animate-in-up max-w-2xl">
            {updates?.map((update) => (
              <div key={update.id} className="pb-12 border-b border-border/50 last:border-0 reveal">
                <div className="font-mono text-xs text-muted-foreground mb-4">
                  {update.createdAt && new Date(update.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="prose prose-neutral dark:prose-invert prose-lg leading-relaxed">
                  <p>{update.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grain" />
    </Layout>
  );
}
