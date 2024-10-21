import { Suspense } from "react";
import { BlogHeader } from "@/app/blog/[slug]/(components)/BlogHeader";
import { BlogContent } from "@/app/blog/[slug]/(components)/BlogContent";
import { BlogNavigation } from "@/app/blog/[slug]/(components)/BlogNavigation";
import { Sidebar } from "@/app/blog/[slug]/(components)/Sidebar";
import CommentSection from "@/app/blog/[slug]/(components)/CommentSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getBlogPost } from "../mockData";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const blogPost = await getBlogPost(params.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-[70%]">
            <article className="prose dark:prose-invert max-w-none">
              <BlogHeader
                title={blogPost.title}
                author={blogPost.author}
                date={blogPost.date}
              />
              <BlogContent content={blogPost.content} />
            </article>

            <BlogNavigation
              previousPost={blogPost.previousPost}
              nextPost={blogPost.nextPost}
            />

            <Suspense fallback={<div>Loading comments...</div>}>
              <CommentSection slug={params.slug} />
            </Suspense>
          </div>

          <div className="md:w-[30%]">
            <Sidebar author={blogPost.author} tags={blogPost.tags} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
