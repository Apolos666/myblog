import Link from "next/link";
import { IBlogPost } from "@/data/schema";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface BlogPostCardProps {
  post: IBlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link 
      href={`/blog/${post._id}`}
      className="block group hover:no-underline w-full"
    >
      <article className="bg-card border rounded-lg shadow-sm overflow-hidden transition-transform duration-200 ease-in-out group-hover:-translate-y-1">
        <div className="aspect-[16/9] relative overflow-hidden w-full h-[240px]">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-3">
            {formatDate(post.createdAt.toISOString())} • {post.author}
          </p>
          <p className="text-foreground/80 text-sm line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
