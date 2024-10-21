import { Suspense } from "react";
import { SearchBar } from "@/components/SearchBar";
import { AuthorCard } from "@/components/AuthorCard";
import { NewsletterSubscribe } from "@/components/NewsletterSubscribe";
import { Header } from "@/components/layout/Header";
import { BlogPostCard } from "@/app/blog/[slug]/(components)/BlogPostCard";
import { Footer } from "@/components/layout/Footer";
import { PaginationWrapper } from "@/components/PaginationWrapper";
import { getBlogPosts } from "./actions";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const searchTerm = searchParams.q || "";
  const { posts, totalPages } = await getBlogPosts(page, 5, searchTerm);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <SearchBar />
            <Suspense fallback={<div>Đang tải...</div>}>
              {posts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </Suspense>
            <PaginationWrapper totalPages={totalPages} />
          </div>
          <div className="space-y-8">
            <AuthorCard />
            <NewsletterSubscribe />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
