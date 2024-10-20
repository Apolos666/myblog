"use client";

import { useState, useRef, useCallback } from "react";
import {
  Save,
  Eye,
  Bold,
  Italic,
  Link,
  Image,
  Code,
  ListOrdered,
  List,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cybersecurity",
  "Blockchain",
  "Cloud Computing",
  "Internet of Things",
  "Artificial Intelligence",
];

interface PostData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
}

export default function CreatePost() {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    coverImage: "",
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

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

  const insertMarkdown = useCallback(
    (prefix: string, suffix = "", placeholder = "") => {
      if (!contentRef.current) return;

      const { selectionStart, selectionEnd, value } = contentRef.current;
      const selectedText = value.substring(selectionStart, selectionEnd);
      const textToInsert = selectedText || placeholder;
      const newText =
        value.substring(0, selectionStart) +
        prefix +
        textToInsert +
        suffix +
        value.substring(selectionEnd);

      setPostData((prev) => ({ ...prev, content: newText }));

      setTimeout(() => {
        if (!contentRef.current) return;
        const newCursorPosition =
          selectionStart + prefix.length + textToInsert.length;
        contentRef.current.selectionStart = contentRef.current.selectionEnd =
          newCursorPosition;
        contentRef.current.focus();
      }, 0);
    },
    []
  );

  const MarkdownButton = ({
    icon,
    tooltip,
    prefix,
    suffix = "",
    placeholder,
  }: {
    icon: React.ReactNode;
    tooltip: string;
    prefix: string;
    suffix?: string;
    placeholder: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => insertMarkdown(prefix, suffix, placeholder)}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Tạo bài viết mới</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[30%] space-y-4">
              <div>
                <Label htmlFor="title">Tiêu đề</Label>
                <Input
                  id="title"
                  name="title"
                  value={postData.title}
                  onChange={handleInputChange}
                  placeholder="Nhập tiêu đề bài viết"
                  required
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Tóm tắt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={postData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Nhập tóm tắt ngắn gọn"
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Danh mục</Label>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Thẻ (phân cách bằng dấu phẩy)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={postData.tags}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: react, javascript, web development"
                />
              </div>
              <div>
                <Label htmlFor="coverImage">URL ảnh bìa</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  value={postData.coverImage}
                  onChange={handleInputChange}
                  placeholder="Nhập URL ảnh bìa"
                />
              </div>
            </div>
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
                <>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <MarkdownButton
                      icon={<Bold className="h-4 w-4" />}
                      tooltip="Đậm"
                      prefix="**"
                      suffix="**"
                      placeholder="văn bản đậm"
                    />
                    <MarkdownButton
                      icon={<Italic className="h-4 w-4" />}
                      tooltip="Nghiêng"
                      prefix="_"
                      suffix="_"
                      placeholder="văn bản nghiêng"
                    />
                    <MarkdownButton
                      icon={<Link className="h-4 w-4" />}
                      tooltip="Liên kết"
                      prefix="["
                      suffix="](https://example.com)"
                      placeholder="văn bản liên kết"
                    />
                    <MarkdownButton
                      icon={<Image className="h-4 w-4" />}
                      tooltip="Hình ảnh"
                      prefix="![Mô tả hình ảnh]("
                      suffix=")"
                      placeholder="https://example.com/image.jpg"
                    />
                    <MarkdownButton
                      icon={<Code className="h-4 w-4" />}
                      tooltip="Mã inline"
                      prefix="`"
                      suffix="`"
                      placeholder="code"
                    />
                    <MarkdownButton
                      icon={<ListOrdered className="h-4 w-4" />}
                      tooltip="Danh sách có thứ tự"
                      prefix="1. "
                      placeholder="Mục danh sách"
                    />
                    <MarkdownButton
                      icon={<List className="h-4 w-4" />}
                      tooltip="Danh sách không thứ tự"
                      prefix="- "
                      placeholder="Mục danh sách"
                    />
                    <MarkdownButton
                      icon={<Heading1 className="h-4 w-4" />}
                      tooltip="Tiêu đề 1"
                      prefix="# "
                      placeholder="Tiêu đề lớn"
                    />
                    <MarkdownButton
                      icon={<Heading2 className="h-4 w-4" />}
                      tooltip="Tiêu đề 2"
                      prefix="## "
                      placeholder="Tiêu đề vừa"
                    />
                    <MarkdownButton
                      icon={<Heading3 className="h-4 w-4" />}
                      tooltip="Tiêu đề 3"
                      prefix="### "
                      placeholder="Tiêu đề nhỏ"
                    />
                    <MarkdownButton
                      icon={<Quote className="h-4 w-4" />}
                      tooltip="Trích dẫn"
                      prefix="> "
                      placeholder="Nội dung trích dẫn"
                    />
                  </div>
                  <Textarea
                    id="content"
                    name="content"
                    value={postData.content}
                    onChange={handleInputChange}
                    placeholder="Viết nội dung bài viết ở đây (Hỗ trợ Markdown)"
                    rows={15}
                    required
                    ref={contentRef}
                  />
                </>
              ) : (
                <Card className="min-h-[400px] overflow-auto">
                  <CardContent className="prose dark:prose-invert max-w-none p-6">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              {...props}
                              style={tomorrow}
                              language={match[1]}
                              PreTag="div"
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {String(children)}
                            </code>
                          );
                        },
                      }}
                    >
                      {postData.content}
                    </ReactMarkdown>
                  </CardContent>
                </Card>
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
      </main>

      <Footer />
    </div>
  );
}
