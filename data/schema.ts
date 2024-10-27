import mongoose, { Schema, Document, model, Model } from 'mongoose';

// Định nghĩa cấu trúc dữ liệu cho một bình luận
export interface ICommentData {
  username: string;
  content: string;
  createdAt: Date;
}

// Mở rộng ICommentData để bao gồm trường _id dưới dạng chuỗi
export interface ICommentWithId extends ICommentData {
  _id: string;
}

// Định nghĩa kiểu dữ liệu cho document bình luận trong MongoDB
export interface ICommentDocument extends ICommentData, Document {
  _id: mongoose.Types.ObjectId;
}

// Schema Mongoose cho bình luận
const CommentSchema: Schema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Định nghĩa cấu trúc dữ liệu cho một bài viết blog
export interface IBlogPostData {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImageUrl: string;
  content: string;
  author: string;
  createdAt: Date;
  comments: ICommentDocument[]; 
}

// Mở rộng IBlogPostData để bao gồm trường _id và chuyển đổi comments thành mảng ICommentWithId
export interface IBlogPostWithId extends Omit<IBlogPostData, 'comments'> {
  _id: string;
  comments: ICommentWithId[]; 
}

// Định nghĩa kiểu dữ liệu cho document bài viết blog trong MongoDB
export interface IBlogPostDocument extends IBlogPostData, Document {
  _id: mongoose.Types.ObjectId;
}

// Schema Mongoose cho bài viết blog
const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  coverImageUrl: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [CommentSchema]
});

// Định nghĩa cấu trúc dữ liệu cho bookmark
export interface IBookmarkData {
  userId: string;
  postId: string;
  collectionId: mongoose.Types.ObjectId;
}

export interface IBookmarkDocument extends IBookmarkData, Document {
  _id: mongoose.Types.ObjectId;
}

const BookmarkSchema: Schema = new Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  collectionId: { type: Schema.Types.ObjectId, ref: 'Collection', required: true },
});

// Định nghĩa cấu trúc dữ liệu cho collection
export interface ICollectionData {
  userId: string;
  name: string;
  description?: string;
}

export interface ICollectionDocument extends ICollectionData, Document {
  _id: mongoose.Types.ObjectId;
}

const CollectionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
});

// Định nghĩa cấu trúc dữ liệu cho người dùng
export interface IUserData {
  clerkId: string;
  fullName: string;
  email: string;
  imageUrl: string;
  createdAt: Date;
}

export interface IUserDocument extends IUserData, Document {
  _id: mongoose.Types.ObjectId;
}

// Schema Mongoose cho người dùng
const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Tạo và xuất các model Mongoose
export const Comment: Model<ICommentDocument> = mongoose.models.Comment || model<ICommentDocument>('Comment', CommentSchema);
export const BlogPost: Model<IBlogPostDocument> = mongoose.models.BlogPost || model<IBlogPostDocument>('BlogPost', BlogPostSchema);
export const User: Model<IUserDocument> = mongoose.models.User || model<IUserDocument>('User', UserSchema);
export const Bookmark: Model<IBookmarkDocument> = mongoose.models.Bookmark || model<IBookmarkDocument>('Bookmark', BookmarkSchema);
export const Collection: Model<ICollectionDocument> = mongoose.models.Collection || model<ICollectionDocument>('Collection', CollectionSchema);
