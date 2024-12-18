"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { IComment } from "@/data/schema";
import { addComment } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { DeleteCommentButton } from './DeleteCommentButton'
import { getPusherClient } from "@/lib/pusher/client";

interface CommentSectionProps {
  slug: string;
  initialComments: IComment[];
}

// Helper function to ensure consistent date handling
function normalizeComment(comment: IComment): IComment {
  return {
    ...comment,
    _id: comment._id.toString(),
    createdAt: comment.createdAt instanceof Date 
      ? comment.createdAt 
      : new Date(comment.createdAt)
  };
}

export default function CommentSection({
  slug,
  initialComments,
}: CommentSectionProps) {
  // Normalize initial comments
  const [comments, setComments] = useState<IComment[]>(() => 
    initialComments.map(normalizeComment)
  );
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const pusher = getPusherClient();
    const channel = pusher.subscribe(`post-${slug}`);

    channel.bind('new-comment', (comment: IComment) => {
      // Kiểm tra xem comment đã tồn tại chưa
      setComments(prevComments => {
        const commentExists = prevComments.some(c => c._id === comment._id);
        if (commentExists) return prevComments;
        return [...prevComments, normalizeComment(comment)];
      });
    });

    channel.bind('delete-comment', (commentId: string) => {
      setComments(prevComments => 
        prevComments.filter(comment => comment._id.toString() !== commentId)
      );
    });

    return () => {
      pusher.unsubscribe(`post-${slug}`);
    };
  }, [slug]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() && user) {
      setIsSubmitting(true);
      try {
        await addComment(
          slug,
          user.fullName || "Người dùng ẩn danh",
          newComment,
          userId!
        );
        setNewComment("");
        toast({
          title: "Bình luận đã được thêm",
          description: "Cảm ơn bạn đã chia sẻ ý kiến!",
        });
      } catch (err) {
        console.error("Error adding comment:", err);
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
        <div key={comment._id.toString()} className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
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
                  {formatDate(comment.createdAt.toISOString())}
                </p>
              </div>
            </div>
            <DeleteCommentButton
              commentId={comment._id.toString()}
              commentUserId={comment.userId}
              postId={slug}
              onCommentDeleted={() => {
                setComments(comments.filter(c => c._id.toString() !== comment._id.toString()))
              }}
            />
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
