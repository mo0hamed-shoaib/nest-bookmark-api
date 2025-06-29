import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { createBookmarkModel } from './models/bookmark.model';
import { DATABASE_CONNECTION_TOKEN } from 'src/Mongo/constants';
import { BOOKMARK_MODEL } from './constants';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: BOOKMARK_MODEL,
      useFactory: (connection: Connection) =>
        createBookmarkModel({ connection }),
      inject: [DATABASE_CONNECTION_TOKEN],
    },
  ],
})
export class BookmarkModule {}
