import { Connection, Document, Schema } from 'mongoose';

export type Bookmark = {
  bookmark_id?: string;
  url: string;
  title: string;
  description?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

/*
FIXME: Because in your base Bookmark type, you wrote:
createdAt?: Date; // optional, So from TypeScript's perspective, createdAt might be: a Date, or undefined. Calling .toISOString() on a possibly undefined value = ❌ compile-time error.
*/
export type BookmarkDocument = Bookmark &
  Document & { createdAt: Date; updatedAt: Date };

/*
FIXME: Now createdAt and updatedAt are guaranteed to exist on any BookmarkDocument, which matches what Mongoose does (because timestamps: true always sets them).
*/

export const bookmarkSchema = new Schema<BookmarkDocument>(
  {
    bookmark_id: { type: String, required: true },
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
