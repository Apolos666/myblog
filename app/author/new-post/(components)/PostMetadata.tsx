import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../(types)/constants";
import { PostData } from "../(types)/types";

interface PostMetadataProps {
  postData: PostData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCategoryChange: (value: string) => void;
}

export function PostMetadata({
  postData,
  handleInputChange,
  handleCategoryChange,
}: PostMetadataProps) {
  return (
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
  );
}
