"use client";

import { Suspense } from "react";
import { SearchResults } from "@/app/search/(components)/SearchResults";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaginationWrapper } from "@/components/PaginationWrapper";
import { SearchForm } from "@/app/search/(components)/SearchForm";
import { IBlogPost } from "@/data/schema";

interface ClientSearchPageProps {
  initialPosts: IBlogPost[];
  totalPages: number;
  searchParams: {
    q?: string;
    category?: string;
    tags?: string;
    page?: string;
  };
}

export function ClientSearchPage({
  initialPosts,
  totalPages,
  searchParams,
}: ClientSearchPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-8">Tìm kiếm bài viết</h1>
        <SearchForm
          initialQuery={searchParams.q || ""}
          initialCategory={searchParams.category || ""}
          initialTags={searchParams.tags || ""}
        />
        <Suspense fallback={<div>Đang tìm kiếm...</div>}>
          <SearchResults posts={initialPosts} />
        </Suspense>
        <PaginationWrapper totalPages={totalPages} />
      </main>
      <Footer />
    </div>
  );
}
