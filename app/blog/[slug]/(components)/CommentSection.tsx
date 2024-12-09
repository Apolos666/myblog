"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { ICommentWithId } from "@/data/schema";
import { addComment } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface CommentSectionProps {
  slug: string;
  initialComments: ICommentWithId[];
}

export default function CommentSection({
  slug,
  initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<ICommentWithId[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async () => {
    if (newComment.trim() && user) {
      setIsSubmitting(true);
      try {
        const comment = await addComment(
          slug,
          user.fullName || "Người dùng ẩn danh",
          newComment
        );
        setComments([...comments, comment]);
        setNewComment("");
        toast({
          title: "Bình luận đã được thêm",
          description: "Cảm ơn bạn đã chia sẻ ý kiến!",
        });
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Không thể thêm bình luận. Vui lòng thử lại sau.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
      {comments.map((comment) => (
        <div key={comment._id} className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-4 mb-2">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.username}`}
                alt={comment.username}
              />
              <AvatarFallback>{comment.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{comment.username}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <ReactMarkdown>{comment.content}</ReactMarkdown>
        </div>
      ))}
      <SignedIn>
        <div className="mt-8">
          <Textarea
            placeholder="Viết bình luận của bạn... (Hỗ trợ Markdown)"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="mb-4"
          />
          <Button onClick={handleCommentSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang gửi...
              </>
            ) : (
              "Gửi bình luận"
            )}
          </Button>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="mt-8 p-4 bg-muted rounded-lg text-center">
          <p className="mb-4">Đăng nhập để bình luận</p>
          <SignInButton>
            <Button>Đăng nhập</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}
