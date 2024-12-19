import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AuthorCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Về tác giả</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src="/author-avatar.jpg" alt="Author" />
          <AvatarFallback>QA</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg mb-2">Trần Đức Quang & Trương Hồng Anh</h3>
        <p className="text-muted-foreground">
          Nhà phát triển đam mê và người yêu công nghệ. Chia sẻ kiến thức và trải nghiệm trong thế giới lập trình.
        </p>
      </CardContent>
    </Card>
  );
}
