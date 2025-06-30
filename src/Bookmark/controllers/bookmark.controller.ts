import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  Delete,
} from '@nestjs/common';
import {
  BookmarkResponseDto,
  CreateBookmarkDto,
  CreateBookmarkSchema,
  UpdateBookmarkDto,
  UpdateBookmarkSchema,
} from '../dtos';
import { TypeboxValidationPipe } from '../pipes/typebox-validation.pipe';
import { BookmarkService } from '../services/bookmark.service';

// Tell Nest that this is Controller
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  // We are using Pipe for incoming requests
  // GET
  @Get()
  async getBookmarks(): Promise<BookmarkResponseDto[]> {
    return this.bookmarkService.getBookmarks();
  }

  @Get(':id')
  async getBookmarkById(@Param('id') id: string): Promise<BookmarkResponseDto> {
    return this.bookmarkService.getBookmarkById(id);
  }

  @Get('tags/:tagName')
  async getBookmarksByTag(@Param('tagName') tagName: string): Promise<BookmarkResponseDto[]> {
    return this.bookmarkService.getBookmarksByTag(tagName);
  }
  // ...

  // POST
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new TypeboxValidationPipe(CreateBookmarkSchema))
  async createBookmark(
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<BookmarkResponseDto> {
    return this.bookmarkService.createBookmark(createBookmarkDto);
  }
  // ...

  // PATCH
  @Patch(':id')
  @UsePipes(new TypeboxValidationPipe(UpdateBookmarkSchema))
  async updateBookmark(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<BookmarkResponseDto> {
    return this.bookmarkService.updateBookmark(id, updateBookmarkDto);
  }
  // ...

  // DELETE
  @Delete(':id')
  async deleteBookmark(@Param('id') id: string): Promise<BookmarkResponseDto> {
    return this.bookmarkService.deleteBookmark(id);
  }
  // ...
}
