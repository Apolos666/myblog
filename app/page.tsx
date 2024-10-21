"use client";

import { useState } from "react";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { AuthorCard } from "@/components/AuthorCard";
import { NewsletterSubscribe } from "@/components/NewsletterSubscribe";
import { Header } from "@/components/layout/Header";
import { BlogPostCard } from "@/app/blog/[slug]/(components)/BlogPostCard";
import { Footer } from "@/components/layout/Footer";

// Simulated blog post data
const blogPosts = [
  {
    id: 1,
    title: "Understanding Authentication in .NET Core",
    excerpt:
      "Dive into the world of authentication in .NET Core applications. Learn about different authentication mechanisms and how to implement them effectively.",
    date: "2023-10-20",
    tags: ["C#", ".NET Core", "Authentication"],
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Mastering React Hooks",
    excerpt:
      "Explore the power of React Hooks and how they can simplify your component logic. We'll cover useState, useEffect, and custom hooks.",
    date: "2023-10-15",
    tags: ["React", "JavaScript", "Web Development"],
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Building Scalable APIs with GraphQL",
    excerpt:
      "Learn how to design and implement scalable APIs using GraphQL. We'll cover schema design, resolvers, and best practices.",
    date: "2023-10-10",
    tags: ["GraphQL", "API", "Backend"],
    image: "/placeholder.svg",
  },
  // Add more blog posts here...
];

const POSTS_PER_PAGE = 5;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {paginatedPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
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
