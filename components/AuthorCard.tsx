import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AuthorCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Author</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src="/author-avatar.jpg" alt="Author" />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg mb-2">Apolos</h3>
        <p className="text-muted-foreground">
          Passionate developer and tech enthusiast. Sharing knowledge and
          experiences in the world of programming.
        </p>
      </CardContent>
    </Card>
  );
}
