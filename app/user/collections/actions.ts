"use server";

import dbConnect from "@/data/dbConnect";
import { Collection, Bookmark, BlogPost } from "@/data/schema";

interface SavedPost {
  _id: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  createdAt: Date;
}

interface CollectionWithPosts {
  id: string;
  name: string;
  description?: string;
  posts: SavedPost[];
}

export async function getUserCollectionsWithPosts(userId: string): Promise<CollectionWithPosts[]> {
  await dbConnect();

  try {
    // Lấy tất cả collections của user
    const collections = await Collection.find({ userId }).lean();

    // Lấy posts cho từng collection
    const collectionsWithPosts = await Promise.all(
      collections.map(async (collection) => {
        // Lấy tất cả bookmarks trong collection này
        const bookmarks = await Bookmark.find({
          userId,
          collectionId: collection._id,
        }).lean();

        // Lấy thông tin của các bài post được bookmark
        const postIds = bookmarks.map((bookmark) => bookmark.postId);
        const posts = await BlogPost.find(
          { _id: { $in: postIds } },
          'title excerpt coverImageUrl createdAt'
        ).lean();

        return {
          id: collection._id.toString(),
          name: collection.name,
          description: collection.description,
          posts: posts.map(post => ({
            _id: post._id.toString(),
            title: post.title,
            excerpt: post.excerpt,
            coverImageUrl: post.coverImageUrl,
            createdAt: post.createdAt,
          })),
        };
      })
    );

    return collectionsWithPosts;
  } catch (error) {
    console.error('Error fetching collections with posts:', error);
    throw error;
  }
}
