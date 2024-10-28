import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AuthorProfileProps {
  author: {
    username: string;
    userId: string;
    totalPosts: number;
  };
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="text-2xl bg-primary/10">
            {author.username[0].toUpperCase()}
          </AvatarFallback>
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
