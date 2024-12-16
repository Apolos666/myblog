import { IBlogPost } from "@/data/schema";
import { BlogPostCard } from '@/app/blog/[slug]/(components)/BlogPostCard';
import { DeletePostButton } from '@/app/author/my-posts/(components)/DeletePostButton';

interface SearchResultsProps {
  posts: IBlogPost[];
  showDeleteButton?: boolean;
}

export function SearchResults({ posts, showDeleteButton }: SearchResultsProps) {
  if (posts.length === 0) {
    return <p className="text-center text-muted-foreground mt-8">Không tìm thấy bài viết nào</p>;
  }

  return (
    <div className="grid gap-6 mt-8">
      {posts.map((post) => (
        <div key={post._id.toString()} className="relative">
          <BlogPostCard post={post} />
          {showDeleteButton && (
            <div className="absolute top-4 right-4">
              <DeletePostButton postId={post._id.toString()} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
