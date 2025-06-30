import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { createBookmarkModel } from './models/bookmark.model';
import { DATABASE_CONNECTION_TOKEN } from 'src/Mongo/constants';
import { BOOKMARK_MODEL } from './constants';
import { BookmarkRepository } from './repositories/bookmark.repository';
import { BookmarkService } from './services/bookmark.service';
import { TypeboxValidationPipe } from './pipes/typebox-validation.pipe';
import { BookmarkController } from './controllers/bookmark.controller';

@Module({
  imports: [],
  controllers: [BookmarkController],
  providers: [
    BookmarkRepository,
    BookmarkService,
    {
      provide: BOOKMARK_MODEL,
      useFactory: (connection: Connection) =>
        createBookmarkModel({ connection }),
      inject: [DATABASE_CONNECTION_TOKEN],
    },
  ],
})
export class BookmarkModule {}
