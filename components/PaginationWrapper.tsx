"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Pagination } from "./Pagination";

interface PaginationWrapperProps {
  totalPages: number;
}

export function PaginationWrapper({ totalPages }: PaginationWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
