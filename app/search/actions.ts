"use server";

import dbConnect from "@/data/dbConnect";
import { BlogPost, IBlogPost, IComment } from "@/data/schema";
import mongoose from "mongoose";

export async function searchBlogPosts(
  query: string,
  category: string,
  tags: string[],
  page: number = 1,
  limit: number = 5
): Promise<{ posts: IBlogPost[]; totalPages: number }> {
  await dbConnect();

  const searchQuery: Record<string, any> = {};

  if (query) {
    searchQuery.$or = [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ];
  }

  if (category && category !== "all") {
    searchQuery.category = category;
  }

  if (tags.length > 0) {
    searchQuery.tags = { $in: tags };
  }

  const totalPosts = await BlogPost.countDocuments(searchQuery);
  const totalPages = Math.ceil(totalPosts / limit);

  const rawPosts = await BlogPost.find(searchQuery)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const posts: IBlogPost[] = rawPosts.map((post) => ({
    ...post,
    _id: (post._id as mongoose.Types.ObjectId).toString(),
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    coverImageUrl: post.coverImageUrl,
    content: post.content,
    author: post.author,
    userId: post.userId,
    createdAt: post.createdAt,
    comments: post.comments.map((comment: IComment & { _id: mongoose.Types.ObjectId }) => ({
      ...comment,
      _id: (comment._id as mongoose.Types.ObjectId).toString(),
    })),
  }));

  return { posts, totalPages };
}
