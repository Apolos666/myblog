import { BlogPostCard } from "@/app/blog/[slug]/(components)/BlogPostCard";

interface SearchResultsProps {
  searchTerm: string;
  selectedTags: string[];
}

async function searchBlogPosts(term: string, tags: string[]) {
  // Implement logic to search blog posts
  // This is a placeholder
  const posts = [
    {
      id: "1",
      title: "Post 1",
      excerpt: "Excerpt 1",
      date: "2023-01-01",
      tags: ["tag1", "tag2"],
      image: "/placeholder.svg",
    },
    {
      id: "2",
      title: "Post 2",
      excerpt: "Excerpt 2",
      date: "2023-01-02",
      tags: ["tag2", "tag3"],
      image: "/placeholder.svg",
    },
  ];

  return posts.filter(
    (post) =>
      (post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(term.toLowerCase())) &&
      (tags.length === 0 || tags.some((tag) => post.tags.includes(tag)))
  );
}

export async function SearchResults({
  searchTerm,
  selectedTags,
}: SearchResultsProps) {
  const results = await searchBlogPosts(searchTerm, selectedTags);

  if (results.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No posts found matching your search criteria.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {results.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
