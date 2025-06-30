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
  UseGuards,
  Req,
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
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

// Tell Nest that this is Controller
@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  // We are using Pipe for incoming requests
  // GET
  @Get()
  async getBookmarks(@Req() req): Promise<BookmarkResponseDto[]> {
    return this.bookmarkService.getBookmarks(req.user.userId);
  }

  @Get(':id')
  async getBookmarkById(@Param('id') id: string, @Req() req): Promise<BookmarkResponseDto> {
    return this.bookmarkService.getBookmarkById(id, req.user.userId);
  }

  @Get('tags/:tagName')
  async getBookmarksByTag(@Param('tagName') tagName: string, @Req() req): Promise<BookmarkResponseDto[]> {
    return this.bookmarkService.getBookmarksByTag(tagName, req.user.userId);
  }
  // ...

  // POST
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new TypeboxValidationPipe(CreateBookmarkSchema))
  async createBookmark(
    @Body() createBookmarkDto: CreateBookmarkDto,
    @Req() req,
  ): Promise<BookmarkResponseDto> {
    return this.bookmarkService.createBookmark(createBookmarkDto, req.user.userId);
  }
  // ...

  // PATCH
  @Patch(':id')
  @UsePipes(new TypeboxValidationPipe(UpdateBookmarkSchema))
  async updateBookmark(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
    @Req() req,
  ): Promise<BookmarkResponseDto> {
    return this.bookmarkService.updateBookmark(id, updateBookmarkDto, req.user.userId);
  }
  // ...

  // DELETE
  @Delete(':id')
  async deleteBookmark(@Param('id') id: string, @Req() req): Promise<BookmarkResponseDto> {
    return this.bookmarkService.deleteBookmark(id, req.user.userId);
  }
  // ...
}
