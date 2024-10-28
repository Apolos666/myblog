import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AuthorProfileProps {
  author: {
    username: string;
    totalPosts: number;
  };
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${author.username}`}
            alt={author.username}
          />
          <AvatarFallback>{author.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{author.username}</h1>
          <p className="text-muted-foreground">
            {author.totalPosts} bài viết đã đăng
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Các bài viết của {author.username}
        </p>
      </CardContent>
    </Card>
  );
}
