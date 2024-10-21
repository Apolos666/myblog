"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PostForm } from "./(components)/PostForm";

export default function CreatePost() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-16">
        <h2 className="text-3xl font-bold mb-8">Tạo bài viết mới</h2>
        <PostForm />
      </main>

      <Footer />
    </div>
  );
}
