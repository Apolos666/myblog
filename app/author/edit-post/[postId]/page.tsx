import { EditPostForm } from "../(components)/EditPostForm";
import { getPostForEdit } from "../actions";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";

export default async function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  try {
    const post = await getPostForEdit(params.postId);

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Chỉnh sửa bài viết</h1>
            <EditPostForm post={post} postId={params.postId} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
} 