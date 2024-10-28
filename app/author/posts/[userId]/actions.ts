"use server";

import dbConnect from "@/data/dbConnect";
import { BlogPost, IBlogPostWithId } from "@/data/schema";

interface SearchQueryType {
  userId: string;
  $or?: { [key: string]: { $regex: string; $options: string } }[];
  category?: string;
  tags?: { $in: string[] };
}

interface AuthorInfo {
  username: string;
  userId: string;
  totalPosts: number;
}

export async function getAuthorPosts(
  userId: string,
  query: string,
  category: string,
  tags: string[],
  page: number = 1,
  limit: number = 12 // Tăng limit lên để grid đẹp hơn
): Promise<{
  posts: IBlogPostWithId[];
  totalPages: number;
  authorInfo: AuthorInfo;
}> {
  await dbConnect();

  const searchQuery: SearchQueryType = {
    userId: userId,
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

  const firstPost = await BlogPost.findOne({ userId }).lean();
  const totalPosts = await BlogPost.countDocuments({ userId });
  const filteredTotalPosts = await BlogPost.countDocuments(searchQuery);
  const totalPages = Math.ceil(filteredTotalPosts / limit);

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

  const authorInfo: AuthorInfo = {
    username: firstPost?.author || "Unknown Author",
    userId,
    totalPosts,
  };

  return { posts, totalPages, authorInfo };
}
