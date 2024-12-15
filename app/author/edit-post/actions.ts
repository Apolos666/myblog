"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { PostData } from "../new-post/(types)/types";
import dbConnect from "@/data/dbConnect";
import { BlogPost } from "@/data/schema";

export async function getPostForEdit(postId: string) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const post = await BlogPost.findOne({
    _id: postId,
    userId: userId,
  }).lean();

  if (!post) {
    throw new Error("Post not found");
  }

  return {
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    category: post.category,
    tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    coverImage: post.coverImageUrl,
  };
}

export async function updatePost(postId: string, data: PostData) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const updatedPost = await BlogPost.findOneAndUpdate(
    {
      _id: postId,
      userId: userId,
    },
    {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      category: data.category,
      tags: data.tags.split(",").map(tag => tag.trim()),
      coverImageUrl: data.coverImage,
    },
    { new: true, lean: true }
  );

  if (!updatedPost) {
    throw new Error("Post not found");
  }

  revalidatePath(`/blog/${postId}`);
  
  return {
    _id: updatedPost._id.toString(),
    title: updatedPost.title,
    content: updatedPost.content,
    excerpt: updatedPost.excerpt,
    category: updatedPost.category,
    tags: updatedPost.tags,
    coverImageUrl: updatedPost.coverImageUrl,
  };
} 