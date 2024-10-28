import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchForm } from "@/app/search/(components)/SearchForm";
import { SearchResults } from "@/app/search/(components)/SearchResults";
import { AuthorProfile } from "./(components)/AuthorProfile";
import { PaginationWrapper } from "@/components/PaginationWrapper";
import { getAuthorPosts } from "./actions";

export default async function AuthorProfilePage({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { q?: string; category?: string; tags?: string; page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { posts, totalPages, authorInfo } = await getAuthorPosts(
    params.username,
    searchParams.q || "",
    searchParams.category || "",
    searchParams.tags?.split(",") || [],
    page,
    10
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <AuthorProfile author={authorInfo} />
        <div className="mt-8">
          <SearchForm
            initialQuery={searchParams.q || ""}
            initialCategory={searchParams.category || ""}
            initialTags={searchParams.tags || ""}
          />
          <SearchResults posts={posts} />
          {totalPages > 1 && (
            <div className="mt-8">
              <PaginationWrapper totalPages={totalPages} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
