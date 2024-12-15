import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function fetchRelatedPosts() {
  // Implement logic to fetch related posts
  // This is a placeholder
  return [
    { id: "1", title: "Related Post 1", excerpt: "Excerpt for related post 1" },
    { id: "2", title: "Related Post 2", excerpt: "Excerpt for related post 2" },
  ];
}

export async function RelatedPosts() {
  const relatedPosts = await fetchRelatedPosts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {relatedPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.id}`}
                className="block hover:bg-muted p-2 rounded"
              >
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
