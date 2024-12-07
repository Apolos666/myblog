import { BlogPostCard } from "@/app/blog/[slug]/(components)/BlogPostCard";
import { IBlogPostWithId } from "@/data/schema";

interface SearchResultsProps {
  posts: IBlogPostWithId[];
}

export function SearchResults({ posts }: SearchResultsProps) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        Không tìm thấy bài viết nào phù hợp với tiêu chí tìm kiếm.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <BlogPostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
