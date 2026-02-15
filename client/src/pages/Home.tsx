import { Layout } from "@/components/Layout";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Home() {
  useScrollReveal();
  return (
    <Layout>
      <div className="flex flex-col gap-12 md:gap-24 animate-in-up">
        <section className="space-y-8 max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.1] text-balance">
            I build systems that <br className="hidden md:block" />
            <span className="font-serif italic font-medium">outlive trends.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed reveal">
            Co-founder of Kue. Obsessed with digital longevity, stark minimalism, and the intersection of engineering and philosophy.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-8 border-t border-border/50 delay-200 animate-in-up reveal">
          <div className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Current Focus</h2>
            <Link href="/kue" className="group block">
              <div className="flex items-center justify-between border border-border p-6 hover:bg-secondary/50 transition-colors duration-400">
                <span className="text-xl font-medium">Kue</span>
                <ArrowUpRight className="h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-400" />
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Recent Thoughts</h2>
            <Link href="/thinking" className="group block">
              <div className="flex items-center justify-between border border-border p-6 hover:bg-secondary/50 transition-colors duration-400">
                <span className="text-xl font-medium">Principles</span>
                <ArrowUpRight className="h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-400" />
              </div>
            </Link>
          </div>
        </section>

        <div className="pt-24 reveal text-center">
          <p className="text-muted-foreground font-mono text-sm">
            Press <kbd className="px-2 py-1 bg-muted rounded border text-xs">/</kbd> to navigate
          </p>
        </div>
      </div>
      <div className="grain" />
    </Layout>
  );
}
