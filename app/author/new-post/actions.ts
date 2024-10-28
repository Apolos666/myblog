"use server";

import dbConnect from "@/data/dbConnect";
import { BlogPost } from "@/data/schema";
import { PostData } from "./(types)/types";
import { currentUser } from "@clerk/nextjs/server";

export async function savePost(postData: PostData) {
  await dbConnect();

  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const newPost = new BlogPost({
    title: postData.title,
    excerpt: postData.excerpt,
    category: postData.category,
    tags: postData.tags.split(",").map((tag) => tag.trim()),
    coverImageUrl: postData.coverImage,
    content: postData.content,
    author: user.fullName,
    userId: user.id, 
  });

  await newPost.save();
  return { success: true };
}
