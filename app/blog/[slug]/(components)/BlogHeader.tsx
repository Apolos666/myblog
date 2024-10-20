import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogHeaderProps {
  title: string;
  author: string;
  date: string;
}

export function BlogHeader({ title, author, date }: BlogHeaderProps) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="flex items-center space-x-4 mb-8">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={author} />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
    </>
  );
}
