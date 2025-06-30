import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './Mongo/mongo.module';
import { BookmarkModule } from './Bookmark/bookmark.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongoModule,
    BookmarkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
