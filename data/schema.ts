import mongoose, { Schema, Document, model, Model } from 'mongoose';

export interface ICommentData {
  username: string;
  content: string;
  createdAt: Date;
}

export interface ICommentWithId extends ICommentData {
  _id: string;
}

export interface ICommentDocument extends ICommentData, Document {
  _id: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

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

export interface IBlogPostWithId extends Omit<IBlogPostData, 'comments'> {
  _id: string;
  comments: ICommentWithId[]; 
}

export interface IBlogPostDocument extends IBlogPostData, Document {}

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

export const Comment: Model<ICommentDocument> = mongoose.models.Comment || model<ICommentDocument>('Comment', CommentSchema);
export const BlogPost: Model<IBlogPostDocument> = mongoose.models.BlogPost || model<IBlogPostDocument>('BlogPost', BlogPostSchema);
