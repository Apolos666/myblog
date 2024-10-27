"use server";

import dbConnect from "@/data/dbConnect";
import { BlogPost, IBlogPostWithId, ICommentWithId, Comment, ICommentDocument } from "@/data/schema";

export async function getBlogPostById(id: string): Promise<IBlogPostWithId | null> {
  await dbConnect();

  const post = await BlogPost.findById(id).lean();

  if (!post) {
    return null;
  }

  return {
    ...post,
    _id: post._id.toString(),
    comments: post.comments.map((comment) => ({
      ...comment,
      _id: comment._id.toString(),
    })),
  };
}

export async function addComment(postId: string, username: string, content: string): Promise<ICommentWithId> {
  await dbConnect();

  const post = await BlogPost.findById(postId);
  if (!post) {
    throw new Error("Bài viết không tồn tại");
  }

  const newComment: ICommentDocument = new Comment({
    username,
    content,
    createdAt: new Date(),
  });

  post.comments.push(newComment);
  await post.save();

  return {
    _id: newComment._id.toString(),
    username: newComment.username,
    content: newComment.content,
    createdAt: newComment.createdAt,
  };
}
