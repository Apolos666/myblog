"use server";

import dbConnect from "@/data/dbConnect";
import { BlogPost, IBlogPostWithId } from "@/data/schema";

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