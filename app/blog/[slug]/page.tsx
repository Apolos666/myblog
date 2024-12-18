import { Suspense } from "react";
import { BlogHeader } from "@/app/blog/[slug]/(components)/BlogHeader";
import { BlogContent } from "@/app/blog/[slug]/(components)/BlogContent";
import { BlogNavigation } from "@/app/blog/[slug]/(components)/BlogNavigation";
import { Sidebar } from "@/app/blog/[slug]/(components)/Sidebar";
import CommentSection from "@/app/blog/[slug]/(components)/CommentSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { notFound } from "next/navigation";
import { getBlogPost } from "./actions";
import { BookmarkButton } from "@/components/BookmarkButton";
import { EditButton } from "./(components)/EditButton";
import { auth } from '@clerk/nextjs/server'

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const blogPost = await getBlogPost(params.slug);
  const { userId } = auth();

  if (!blogPost) {
    notFound();
  }

  const isAuthor = userId === blogPost.userId;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-[70%]">
            <article className="prose dark:prose-invert max-w-none">
              <div className="flex flex-col mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-bold mb-0">{blogPost.title}</h1>
                  <div className="flex items-center gap-2">
                    {isAuthor && <EditButton postId={blogPost._id} className="scale-125 mr-4" />}
                    <BookmarkButton postId={blogPost._id} className="scale-125" />
                  </div>
                </div>
                <BlogHeader
                  author={blogPost.author}
                  userId={blogPost.userId}
                  date={blogPost.createdAt.toISOString().split("T")[0]}
                />
              </div>
              <BlogContent content={blogPost.content} />
            </article>

            <BlogNavigation previousPost={undefined} nextPost={undefined} />

            <Suspense fallback={<div>Đang tải bình luận...</div>}>
              <CommentSection
                slug={params.slug}
                initialComments={blogPost.comments}
              />
            </Suspense>
          </div>

          <div className="md:w-[30%]">
            <Sidebar 
              author={blogPost.author} 
              authorId={blogPost.userId}
              postId={blogPost._id}
              tags={blogPost.tags} 
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
