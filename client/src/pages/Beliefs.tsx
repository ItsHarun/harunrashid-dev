import { Layout } from "@/components/Layout";
import { useBeliefs } from "@/hooks/use-content";
import { Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Beliefs() {
  const { data: beliefs, isLoading, error } = useBeliefs();
  useScrollReveal([isLoading]);

  return (
    <Layout>
      <div className="space-y-12 md:space-y-20">
        <div className="space-y-4 animate-in-up">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">Beliefs</h1>
          <p className="text-muted-foreground font-mono text-sm reveal">
            Core principles guiding my work and life.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-destructive py-10 font-mono text-sm">
            Error loading beliefs.
          </div>
        ) : (
          <div className="grid gap-12 delay-200 animate-in-up">
            {beliefs?.map((belief, i) => (
              <div
                key={belief.id}
                className="flex gap-6 md:gap-12 items-baseline group reveal"
              >
                <span className="font-mono text-xs text-muted-foreground/40 shrink-0 select-none">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <p className="text-xl md:text-3xl font-light leading-relaxed group-hover:text-foreground transition-colors text-muted-foreground">
                  {belief.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grain" />
    </Layout>
  );
}
