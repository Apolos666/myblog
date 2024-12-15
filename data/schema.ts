import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

// Comment Schema
interface IComment {
  _id: mongoose.Types.ObjectId | string;
  username: string;
  content: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  username: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// BlogPost Schema
interface IBlogPost {
  _id: mongoose.Types.ObjectId | string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImageUrl: string;
  content: string;
  author: string;
  userId: string;
  createdAt: Date;
  comments: IComment[];
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  coverImageUrl: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [CommentSchema]
});

// Bookmark Schema
interface IBookmark {
  userId: string;
  postId: string;
  collectionId: mongoose.Types.ObjectId;
}

const BookmarkSchema = new Schema<IBookmark>({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  collectionId: { type: Schema.Types.ObjectId, ref: 'Collection', required: true }
});

// Collection Schema
interface ICollection {
  userId: string;
  name: string;
  description?: string;
}

const CollectionSchema = new Schema<ICollection>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: String
});

// User Schema
interface IUser {
  clerkId: string;
  fullName: string;
  email: string;
  imageUrl?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

// Export interfaces for use in application
export type { IComment, IBlogPost, IBookmark, ICollection, IUser };

// Export models
export const Comment = models.Comment || model<IComment>('Comment', CommentSchema);
export const BlogPost = models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema);
export const Bookmark = models.Bookmark || model<IBookmark>('Bookmark', BookmarkSchema);
export const Collection = models.Collection || model<ICollection>('Collection', CollectionSchema);
export const User = models.User || model<IUser>('User', UserSchema);
