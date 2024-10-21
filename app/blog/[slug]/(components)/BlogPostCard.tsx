import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBlogPostWithId } from "@/data/schema";
import Link from "next/link";

interface BlogPostCardProps {
  post: IBlogPostWithId;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-80 mb-4">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-md"
          />
        </div>
        <p className="text-muted-foreground mb-2">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/blog/${post._id}`} passHref>
          <Button variant="outline">Đọc thêm</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
