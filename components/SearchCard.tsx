"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchCard() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/search");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tìm kiếm bài viết</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Tìm kiếm bài viết theo tiêu đề, danh mục hoặc thẻ.
        </p>
        <Button onClick={handleSearchClick} className="w-full">
          <Search className="mr-2 h-4 w-4" />
          Đi đến trang tìm kiếm
        </Button>
      </CardContent>
    </Card>
  );
}
