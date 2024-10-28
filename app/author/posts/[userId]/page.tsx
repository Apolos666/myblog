import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchForm } from "@/app/search/(components)/SearchForm";
import { PostsGrid } from "./(components)/PostsGrid";
import { PaginationWrapper } from "@/components/PaginationWrapper";
import { getAuthorPosts } from "./actions";
import { AuthorProfile } from "./(components)/AuthorProfile";

export default async function AuthorProfilePage({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { q?: string; category?: string; tags?: string; page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { posts, totalPages, authorInfo } = await getAuthorPosts(
    params.userId,
    searchParams.q || "",
    searchParams.category || "",
    searchParams.tags?.split(",") || [],
    page,
    12
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
          <div className="mt-6">
            <PostsGrid posts={posts} />
          </div>
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
