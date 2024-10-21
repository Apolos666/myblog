"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Search className="text-muted-foreground" />
      <Input
        type="search"
        placeholder="Tìm kiếm bài viết..."
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full"
      />
      {isPending && (
        <span className="text-sm text-muted-foreground">Đang tìm kiếm...</span>
      )}
    </div>
  );
}
