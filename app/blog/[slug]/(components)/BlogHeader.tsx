import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogHeaderProps {
  author: string;
  date: string;
}

export function BlogHeader({ author, date }: BlogHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={author} />
        <AvatarFallback>{author[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}
