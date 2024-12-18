"use server";

import dbConnect from "@/data/dbConnect";
import { BlogPost, IBlogPost, IComment } from "@/data/schema";
import mongoose from "mongoose";

interface AuthorInfo {
  username: string;
  totalPosts: number;
}

export async function getAuthorPosts(
  username: string,
  query: string,
  category: string,
  tags: string[],
  page: number = 1,
  limit: number = 10
): Promise<{
  posts: IBlogPost[];
  totalPages: number;
  authorInfo: AuthorInfo;
}> {
  await dbConnect();

  const searchQuery: Record<string, any> = {
    author: username,
  };

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

  const totalPosts = await BlogPost.countDocuments({ author: username });
  const filteredTotalPosts = await BlogPost.countDocuments(searchQuery);
  const totalPages = Math.ceil(filteredTotalPosts / limit);

  const rawPosts = await BlogPost.find(searchQuery)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean() as (IBlogPost & { _id: mongoose.Types.ObjectId })[];

  const posts = rawPosts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    comments: post.comments.map((comment) => ({
      ...comment,
      _id: (comment._id as mongoose.Types.ObjectId).toString(),
    })),
  }));

  const authorInfo: AuthorInfo = {
    username,
    totalPosts,
  };

  return { posts, totalPages, authorInfo };
}
