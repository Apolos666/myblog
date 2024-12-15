import Image from "next/image";
import Link from "next/link";
import { IBlogPost } from "@/data/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostsGridProps {
  posts: IBlogPost[];
}

export function PostsGrid({ posts }: PostsGridProps) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        Không tìm thấy bài viết nào.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post._id.toString()} href={`/blog/${post._id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
            <div className="relative aspect-video">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString("vi-VN")}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
