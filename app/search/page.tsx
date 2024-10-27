import { searchBlogPosts } from "./actions";
import { ClientSearchPage } from "./(components)/ClientSearchPage";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; tags?: string; page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { posts, totalPages } = await searchBlogPosts(
    searchParams.q || "",
    searchParams.category || "",
    searchParams.tags?.split(",") || [],
    page,
    5
  );

  return (
    <ClientSearchPage
      initialPosts={posts}
      totalPages={totalPages}
      searchParams={searchParams}
    />
  );
}
