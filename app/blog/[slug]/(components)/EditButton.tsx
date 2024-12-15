"use client";

import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface EditButtonProps {
  postId: string;
  className?: string;
}

export function EditButton({ postId, className }: EditButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className={`h-9 w-9 ${className}`}
      onClick={() => router.push(`/author/edit-post/${postId}`)}
    >
      <PenSquare className="h-4 w-4" />
    </Button>
  );
} 