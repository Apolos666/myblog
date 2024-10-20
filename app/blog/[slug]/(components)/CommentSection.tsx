"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

const initialComments = [
  {
    id: 1,
    author: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2023-10-21",
    content:
      "Great article! I especially liked the explanation of the basic authentication flow.",
  },
  {
    id: 2,
    author: "Bob Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2023-10-22",
    content:
      "Could you elaborate more on the security implications of JWT? I've heard there are some potential issues.",
  },
];

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Current User", // Trong ứng dụng thực tế, đây sẽ là người dùng đã đăng nhập
        avatar: "/placeholder.svg?height=40&width=40",
        date: new Date().toISOString().split("T")[0],
        content: newComment,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-4 mb-2">
            <Avatar>
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{comment.author}</p>
              <p className="text-sm text-muted-foreground">{comment.date}</p>
            </div>
          </div>
          <ReactMarkdown>{comment.content}</ReactMarkdown>
        </div>
      ))}
      <div className="mt-8">
        <Textarea
          placeholder="Write a comment... (Markdown supported)"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          className="mb-4"
        />
        <Button onClick={handleCommentSubmit}>Post Comment</Button>
      </div>
    </div>
  );
}
