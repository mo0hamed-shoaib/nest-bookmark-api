import { Connection, Document, Schema } from 'mongoose';

export type Bookmark = {
  url: string;
  title: string;
  description?: string;
  tags?: string[];
  createdAt?: Date;
};

export type BookmarkDocument = Bookmark & Document;

export const bookmarkSchema = new Schema<BookmarkDocument>(
  {
    // id: { type: String, required: true }, Mistake: id is auto generated
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    tags: { type: [String] }, // Mistake: was type: String['']
    // createdAt: { type: Date }, Mistake: timestamps already adds this + updatedAt
  },
  {
    timestamps: true,
  },
);

export const createBookmarkModel = (params: { connection: Connection }) =>
  params.connection.model<BookmarkDocument>('bookmark', bookmarkSchema);
