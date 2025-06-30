import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BookmarkRepository } from '../repositories/bookmark.repository';
import {
  BookmarkResponseDto,
  CreateBookmarkDto,
  UpdateBookmarkDto,
} from '../dtos';
import tryToCatch from 'try-to-catch';
import { Bookmark, BookmarkDocument } from '../models/bookmark.model';

@Injectable()
export class BookmarkService {
  constructor(
    @Inject(BookmarkRepository)
    private readonly bookmarkRepository: BookmarkRepository,
  ) {}
  async getBookmarks(): Promise<BookmarkResponseDto[]> {
    const [error, results] = await tryToCatch(async () => {
      const bookmarks = await this.bookmarkRepository.findAllBookmarks();
      return bookmarks.map(this._transformToResponse);
    });

    if (error) throw error;

    return results;
  }

  async getBookmarkById(id: string): Promise<BookmarkResponseDto> {
    const [error, result] = await tryToCatch(async () => {
      const bookmark = await this.bookmarkRepository.findById(id);
      if (!bookmark)
        throw new NotFoundException(
          `[getBookmarkById] bookmark with ${id} not found`,
        );
      return this._transformToResponse(bookmark);
    });

    if (error) throw error;

    return result;
  }

  async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<BookmarkResponseDto> {
    const [error, result] = await tryToCatch(async () => {
      const bookmarkData: Bookmark = {
        url: createBookmarkDto.url,
        title: createBookmarkDto.title,
        description: createBookmarkDto.description,
        tags: createBookmarkDto.tags,
      };
      const bookmark =
        await this.bookmarkRepository.createBookmark(bookmarkData);
      return this._transformToResponse(bookmark);
    });

    if (error) throw error;

    return result;
  }

  async updateBookmark(
    id: string,
    updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<BookmarkResponseDto> {
    const [error, result] = await tryToCatch(async () => {
      const bookmark = await this.bookmarkRepository.updateBookmark(
        id,
        updateBookmarkDto,
      );
      if (!bookmark) {
        throw new NotFoundException(`Bookmark with ID ${id} not found`);
      }
      return this._transformToResponse(bookmark);
    });

    if (error) throw error;

    return result;
  }

  async deleteBookmark(id: string) {
    const [error, result] = await tryToCatch(async () => {
      const bookmark = await this.bookmarkRepository.deleteBookmark(id);
      if (!bookmark)
        throw new NotFoundException(
          `[deleteBookmark] bookmark with ${id} not found`,
        );
      return this._transformToResponse(bookmark);
    });

    if (error) throw error;

    return result;
  }

  async getBookmarksByTag(tagName: string): Promise<BookmarkResponseDto[]> {
    const [error, results] = await tryToCatch(async () => {
      const bookmarks = await this.bookmarkRepository.findByTag(tagName);
      return bookmarks.map(this._transformToResponse);
    });

    if (error) throw error;

    return results;
  }

  private _transformToResponse(
    bookmark: BookmarkDocument,
  ): BookmarkResponseDto {
    if (!bookmark.url || !bookmark.title)
      throw new InternalServerErrorException(
        `Something went wrong while mapping bookmarks`,
      );
    return {
      bookmark_id: bookmark.bookmark_id,
      url: bookmark.url,
      title: bookmark.title,
      description: bookmark.description,
      tags: bookmark.tags,
      createdAt: bookmark.createdAt.toISOString(),
      updatedAt: bookmark.updatedAt.toISOString(),
    };
  }
}
