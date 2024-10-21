"use server";

import dbConnect from "@/data/dbConnect";
import { BlogPost, IBlogPostWithId, ICommentWithId } from "@/data/schema";

export async function getBlogPosts(
  page: number = 1,
  limit: number = 5,
  searchTerm: string = ""
): Promise<{ posts: IBlogPostWithId[]; totalPages: number }> {
  await dbConnect();

  const query = searchTerm
    ? {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { tags: { $in: [new RegExp(searchTerm, "i")] } },
        ],
      }
    : {};

  const totalPosts = await BlogPost.countDocuments(query);
  const totalPages = Math.ceil(totalPosts / limit);

  const rawPosts = await BlogPost.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const posts: IBlogPostWithId[] = rawPosts.map((post) => ({
    _id: post._id.toString(),
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    coverImageUrl: post.coverImageUrl,
    content: post.content,
    author: post.author,
    createdAt: post.createdAt, 
    comments: post.comments.map((comment): ICommentWithId => ({
      _id: comment._id.toString(),
      username: comment.username,
      content: comment.content,
      createdAt: comment.createdAt, 
    })),
  }));

  return { posts, totalPages };
}
