"use server";

import dbConnect from "@/data/dbConnect";
import { BlogPost, IBlogPostWithId } from "@/data/schema";

export async function searchUserPosts(
  userId: string,
  query: string,
  category: string,
  tags: string[],
  page: number = 1,
  limit: number = 10
): Promise<{ posts: IBlogPostWithId[]; totalPages: number }> {
  await dbConnect();

  const searchQuery: Record<string, any> = {
    userId: userId, // Lọc theo userId
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

  const totalPosts = await BlogPost.countDocuments(searchQuery);
  const totalPages = Math.ceil(totalPosts / limit);

  const rawPosts = await BlogPost.find(searchQuery)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const posts: IBlogPostWithId[] = rawPosts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    comments: post.comments.map((comment) => ({
      ...comment,
      _id: comment._id.toString(),
    })),
  }));

  return { posts, totalPages };
}
