import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchForm } from "@/app/search/(components)/SearchForm";
import { SearchResults } from "@/app/search/(components)/SearchResults";
import { auth } from "@clerk/nextjs/server";
import { searchUserPosts } from "./actions";
import { PaginationWrapper } from "@/components/PaginationWrapper";

export default async function MyPostsPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; tags?: string; page?: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const page = Number(searchParams.page) || 1;
  const { posts, totalPages } = await searchUserPosts(
    userId,
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
        <h1 className="text-3xl font-bold mb-8">Bài viết của tôi</h1>
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
      </main>
      <Footer />
    </div>
  );
}
