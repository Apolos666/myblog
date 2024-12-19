import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DonateDialog } from "@/components/DonateDialog";

interface SidebarProps {
  author: string;
  authorId: string;
  postId: string;
  tags: string[];
}

export function Sidebar({ author, authorId, postId, tags }: SidebarProps) {
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
            {author} Là một nhà phát triển đam mê với hơn 10 năm kinh nghiệm trong phát triển phần mềm và các công nghệ hiện đại.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quảng cáo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted h-40 flex items-center justify-center">
            <p className="text-center">Quảng cáo sẽ hiện ở đây</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ủng hộ tác giả</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Nếu bạn thấy bài viết có ích, hãy ủng hộ tác giả ở đây
          </p>
          <DonateDialog
            postId={postId}
            authorId={authorId}
            authorName={author}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags liên quan</CardTitle>
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
