"use server";

import dbConnect from "@/data/dbConnect";
import { BlogPost, IBlogPostWithId, ICommentWithId, Comment, ICommentDocument, Bookmark, Collection, ICollectionDocument } from "@/data/schema";
import mongoose from "mongoose";

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

export async function addBookmark(userId: string, postId: string, collectionId: string) {
  await dbConnect();
  try {
    // Kiểm tra xem bookmark đã tồn tại chưa
    const existingBookmark = await Bookmark.findOne({
      userId,
      postId,
      collectionId,
    });

    if (existingBookmark) {
      console.log('Bookmark already exists');
      return null;
    }

    const newBookmark = new Bookmark({
      userId,
      postId,
      collectionId: new mongoose.Types.ObjectId(collectionId),
    });

    await newBookmark.save();
    console.log('New bookmark created:', newBookmark);

    return {
      id: newBookmark._id.toString(),
      userId: newBookmark.userId,
      postId: newBookmark.postId,
      collectionId: newBookmark.collectionId.toString(),
    };
  } catch (error) {
    console.error('Error in addBookmark:', error);
    throw error;
  }
}

export async function createCollection(userId: string, name: string, description?: string) {
  await dbConnect();
  const newCollection = await Collection.create({ userId, name, description });
  return { 
    id: newCollection._id.toString(), 
    name: newCollection.name 
  };
}

export async function getUserCollections(userId: string) {
  try {
    await dbConnect();
    
    const collections = await Collection.find({ userId }).lean();
    
    const formattedCollections = collections.map(collection => ({
      id: collection._id.toString(),
      name: collection.name,
      description: collection.description
    }));
    
    return formattedCollections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function isBookmarked(userId: string, postId: string): Promise<boolean> {
  await dbConnect();
  const bookmark = await Bookmark.findOne({ userId, postId }).lean();
  return bookmark !== null;
}

export async function getBookmarkDetails(userId: string, postId: string) {
  await dbConnect();
  
  try {
    // Lấy tất cả bookmarks và populate collection
    const bookmarks = await Bookmark.find({ userId, postId })
      .populate({
        path: 'collectionId',
        model: Collection,
        select: '_id name' // Chỉ lấy các trường cần thiết
      })
      .lean();
    
    console.log('Raw bookmarks before processing:', JSON.stringify(bookmarks, null, 2));
    
    if (!bookmarks || bookmarks.length === 0) {
      console.log('No bookmarks found');
      return [];
    }

    const details = bookmarks
      .filter(bookmark => {
        // Kiểm tra xem bookmark có collectionId và collectionId có phải là object không
        const isValid = bookmark.collectionId && typeof bookmark.collectionId === 'object';
        if (!isValid) {
          console.error('Invalid bookmark structure:', bookmark);
        }
        return isValid;
      })
      .map(bookmark => {
        try {
          const collection = bookmark.collectionId as { _id: any; name: string };
          
          return {
            bookmarkId: bookmark._id.toString(),
            collectionId: collection._id.toString(),
            collectionName: collection.name,
          };
        } catch (error) {
          console.error('Error processing bookmark:', bookmark, error);
          return null;
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    console.log('Processed bookmark details:', details);
    return details;
  } catch (error) {
    console.error('Error in getBookmarkDetails:', error);
    return [];
  }
}

export async function removeBookmarkFromCollection(bookmarkId: string) {
  await dbConnect();
  await Bookmark.findByIdAndDelete(bookmarkId);
}
