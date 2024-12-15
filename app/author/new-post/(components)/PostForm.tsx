"use client";

import { useState, useCallback } from "react";
import { Save, Eye, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PostMetadata } from "./PostMetadata";
import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownPreview } from "./MarkdownPreview";
import { PostData } from "../(types)/types";
import { useToast } from "@/hooks/use-toast";
import { savePost } from "../actions";
import { useRouter } from "next/navigation";

const initialPostData: PostData = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  coverImage: "",
};

export function PostForm() {
  const [postData, setPostData] = useState<PostData>(initialPostData);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setPostData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleCategoryChange = useCallback((value: string) => {
    setPostData((prev) => ({ ...prev, category: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newPost = await savePost(postData);
      toast({
        title: "Thành công",
        description: "Bài viết đã được tạo thành công.",
      });
      router.push(`/blog/${newPost._id}`);
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi tạo bài viết. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <PostMetadata
          postData={postData}
          handleInputChange={handleInputChange}
          handleCategoryChange={handleCategoryChange}
        />
        <div className="w-full md:w-[70%] space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="content">Nội dung (Markdown)</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              {isPreviewMode ? (
                <Pencil className="mr-2 h-4 w-4" />
              ) : (
                <Eye className="mr-2 h-4 w-4" />
              )}
              {isPreviewMode ? "Chỉnh sửa" : "Xem trước"}
            </Button>
          </div>
          {!isPreviewMode ? (
            <MarkdownEditor
              content={postData.content}
              handleInputChange={handleInputChange}
            />
          ) : (
            <MarkdownPreview content={postData.content} />
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Đang lưu..." : "Tạo bài viết"}
        </Button>
      </div>
    </form>
  );
}
