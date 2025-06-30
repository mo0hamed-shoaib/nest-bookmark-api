import { Inject, Injectable, Scope } from '@nestjs/common';
import { BOOKMARK_MODEL } from '../constants';
import { Bookmark, BookmarkDocument } from '../models/bookmark.model';
import tryToCatch from 'try-to-catch';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BookmarkRepository {
  constructor(
    @Inject(BOOKMARK_MODEL) private bookmarkModel: Model<BookmarkDocument>,
  ) {}

  // CRUD Operations
  async createBookmark(bookmark: Bookmark): Promise<BookmarkDocument> {
    const [error, result] = await tryToCatch(async () => {
      return this.bookmarkModel.create({
        ...bookmark,
        bookmark_id: uuid(),
      });
    });

    if (error) throw error;

    return result;
  }

  async findAllBookmarks(userId: string): Promise<BookmarkDocument[]> {
    const [error, results] = await tryToCatch(async () => {
      return this.bookmarkModel.find({ userId }).lean();
    });

    if (error) throw error;

    return results;
  }

  async findById(id: string, userId: string): Promise<BookmarkDocument | null> {
    const [error, result] = await tryToCatch(async () => {
      return this.bookmarkModel.findOne({ bookmark_id: id, userId }).lean();
    });

    if (error) throw error;

    return result;
  }

  async updateBookmark(
    id: string,
    bookmark: Partial<Bookmark>,
    userId: string,
  ): Promise<BookmarkDocument | null> {
    const [error, result] = await tryToCatch(async () => {
      return this.bookmarkModel
        .findOneAndUpdate({ bookmark_id: id, userId }, { ...bookmark }, { new: true })
        .lean();
    });

    if (error) throw error;

    return result;
  }

  async deleteBookmark(id: string, userId: string): Promise<BookmarkDocument | null> {
    const [error, result] = await tryToCatch(async () => {
      return this.bookmarkModel
        .findOneAndDelete({ bookmark_id: id, userId }, { new: true })
        .lean();
    });

    if (error) throw error;

    return result;
  }

  async findByTag(tagName: string, userId: string): Promise<BookmarkDocument[]> {
    const [error, results] = await tryToCatch(async () => {
      return this.bookmarkModel.find({ tags: tagName, userId }).lean();
    });

    if (error) throw error;

    return results;
  }
}
