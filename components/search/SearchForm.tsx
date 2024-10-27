"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/constants";

interface SearchFormProps {
  initialQuery: string;
  initialCategory: string;
  initialTags: string;
}

export function SearchForm({
  initialQuery,
  initialCategory,
  initialTags,
}: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [tags, setTags] = useState(initialTags);
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category && category !== "all") params.set("category", category);
    if (tags) params.set("tags", tags);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Input
        type="text"
        placeholder="Tìm kiếm theo tiêu đề"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Chọn danh mục" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả danh mục</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="text"
        placeholder="Nhập thẻ (phân cách bằng dấu phẩy)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Button type="submit">Tìm kiếm</Button>
    </form>
  );
}
