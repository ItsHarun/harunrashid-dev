import { Link } from "wouter";
import { Layout } from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-in-up">
        <h1 className="text-9xl font-light tracking-tighter text-muted-foreground/20">404</h1>
        <p className="text-xl text-muted-foreground">
          The page you are looking for does not exist in this reality.
        </p>
        <Link 
          href="/"
          className="font-mono text-sm underline underline-offset-4 decoration-1 hover:decoration-2 hover:text-muted-foreground transition-all mt-8"
        >
          Return Home
        </Link>
      </div>
    </Layout>
  );
}
