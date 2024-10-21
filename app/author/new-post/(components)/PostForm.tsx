import { useState, useCallback } from "react";
import { Save, Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PostMetadata } from "./PostMetadata";
import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownPreview } from "./MarkdownPreview";
import { PostData } from "../(types)/types";

export function PostForm() {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    coverImage: "",
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting post data:", postData);
    // Thêm logic gửi dữ liệu đến API ở đây
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
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Lưu bài viết
        </Button>
      </div>
    </form>
  );
}
