import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { type Post } from "@shared/schema";
import { cn } from "@/lib/utils";

interface PostListProps {
  posts: Post[];
  basePath: string;
}

export function PostList({ posts, basePath }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="font-mono text-sm text-muted-foreground animate-in-up">
        No entries found.
      </div>
    );
  }

  return (
    <ul className="space-y-0">
      {posts.map((post, i) => (
        <li 
          key={post.id} 
          className={cn(
            "group animate-in-up border-b border-border/40 last:border-0",
          )}
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <Link 
            href={`${basePath}/${post.slug}`}
            className="block py-6 md:py-8 flex items-baseline justify-between hover:bg-muted/30 transition-colors -mx-4 px-4 rounded-sm"
          >
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
              <span className="font-mono text-xs text-muted-foreground w-24 shrink-0">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                }) : 'DRAFT'}
              </span>
              <h3 className="text-lg md:text-xl font-medium tracking-tight group-hover:underline decoration-1 underline-offset-4">
                {post.title}
              </h3>
            </div>
            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
