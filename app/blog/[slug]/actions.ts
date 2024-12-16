"use server";

import dbConnect from "@/data/dbConnect";
import { BlogPost, type IComment, Collection, Bookmark, IBlogPost } from '@/data/schema';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache'

export async function getBlogPost(slug: string) {
  try {
    await dbConnect();
    const objectId = new mongoose.Types.ObjectId(slug);
    const post = await BlogPost.findOne({ _id: objectId })
      .lean() as (IBlogPost & { _id: mongoose.Types.ObjectId });
    
    if (!post) return null;

    return {
      ...post,
      _id: post._id.toString(),
      comments: post.comments.map(comment => ({
        ...comment,
        _id: comment._id.toString()
      }))
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function addComment(
  postId: string,
  username: string,
  content: string,
  userId: string
): Promise<IComment> {
  await dbConnect();
  
  const post = await BlogPost.findById(postId);
  if (!post) throw new Error("Post not found");

  const now = new Date();
  
  const newComment = {
    _id: new mongoose.Types.ObjectId(),
    username,
    content,
    userId,
    createdAt: now
  };

  post.comments.push(newComment);
  await post.save();
  
  return {
    ...newComment,
    _id: newComment._id.toString()
  };
}

export async function addBookmark(userId: string, postId: string, collectionId: string) {
  await dbConnect();
  
  if (!userId) throw new Error("User ID is required");
  if (!postId) throw new Error("Post ID is required");
  if (!collectionId) throw new Error("Collection ID is required - please select a collection");

  const newBookmark = new Bookmark({
    userId,
    postId,
    collectionId,
    createdAt: new Date()
  });
  
  try {
    await newBookmark.save();
    
    return {
      _id: newBookmark._id.toString(),
      userId: newBookmark.userId,
      postId: newBookmark.postId,
      collectionId: newBookmark.collectionId,
      createdAt: newBookmark.createdAt
    };
  } catch (error) {
    console.error("Error creating bookmark:", error);
    throw new Error("Failed to create bookmark");
  }
}

export async function createCollection(userId: string, collectionName: string) {
  await dbConnect();
  
  const newCollection = new Collection({
    userId,
    name: collectionName,
    createdAt: new Date()
  });
  
  await newCollection.save();

  return {
    id: newCollection._id.toString(),
    name: newCollection.name
  };
}

export async function getUserCollections(userId: string) {
  await dbConnect();
  const collections = await Collection.find({ userId });
  
  return collections.map(collection => ({
    id: collection._id.toString(),
    name: collection.name
  }));
}

export async function getBookmarkDetails(userId: string, postId: string) {
  await dbConnect();
  const bookmarks = await Bookmark.find({ userId, postId })
    .populate('collectionId', 'name');
  
  return bookmarks.map(bookmark => ({
    bookmarkId: bookmark._id.toString(),
    collectionId: bookmark.collectionId._id.toString(),
    collectionName: bookmark.collectionId.name
  }));
}

export async function removeBookmarkFromCollection(bookmarkId: string) {
  await dbConnect();
  const deletedBookmark = await Bookmark.findByIdAndDelete(bookmarkId)
    .populate('collectionId', 'name');
  
  if (!deletedBookmark) {
    throw new Error("Bookmark not found");
  }

  return {
    bookmarkId: deletedBookmark._id.toString(),
    collectionId: deletedBookmark.collectionId._id.toString(),
    collectionName: deletedBookmark.collectionId.name
  };
}

export async function deleteComment(postId: string, commentId: string) {
  await dbConnect();
  
  try {
    const post = await BlogPost.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    // Tìm và xóa comment từ mảng comments
    const commentIndex = post.comments.findIndex(
      comment => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    post.comments.splice(commentIndex, 1);
    await post.save();
    
    revalidatePath(`/blog/${postId}`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false, error: 'Failed to delete comment' };
  }
}
