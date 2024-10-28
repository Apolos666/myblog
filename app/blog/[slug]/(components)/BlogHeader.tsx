import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

interface BlogHeaderProps {
  author: string;
  userId: string;
  date: string;
}

export function BlogHeader({ author, userId, date }: BlogHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <Link href={`/author/posts/${userId}`} className="hover:opacity-80">
        <Avatar>
          <AvatarFallback className="bg-primary/10">
            {author[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
      <div>
        <Link
          href={`/author/posts/${userId}`}
          className="font-semibold hover:text-primary"
        >
          {author}
        </Link>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}
