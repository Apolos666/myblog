import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogNavigationProps {
  previousPost?: { id: number; title: string };
  nextPost?: { id: number; title: string };
}

export function BlogNavigation({
  previousPost,
  nextPost,
}: BlogNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8 mb-12">
      {previousPost && (
        <Link href={`/blog/${previousPost.id}`} className="flex items-center">
          <ChevronLeft className="mr-2" />
          <span>Previous: {previousPost.title}</span>
        </Link>
      )}
      {nextPost && (
        <Link href={`/blog/${nextPost.id}`} className="flex items-center">
          <span>Next: {nextPost.title}</span>
          <ChevronRight className="ml-2" />
        </Link>
      )}
    </div>
  );
}
