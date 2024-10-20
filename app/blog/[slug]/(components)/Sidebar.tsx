import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  author: string;
  tags: string[];
}

export function Sidebar({ author, tags }: SidebarProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>About the Author</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=60&width=60"
                alt={author}
              />
              <AvatarFallback>{author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{author}</p>
              <p className="text-sm text-muted-foreground">Software Engineer</p>
            </div>
          </div>
          <p className="text-sm">
            {author} is a passionate developer with over 10 years of experience
            in .NET technologies.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advertisement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted h-40 flex items-center justify-center">
            <p className="text-center">Your Ad Here</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support the Author</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            If you found this article helpful, consider supporting the author:
          </p>
          <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded">
            Donate
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
