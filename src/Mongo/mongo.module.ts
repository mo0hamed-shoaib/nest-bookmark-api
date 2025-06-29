import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION_TOKEN } from './constants';
import mongoose from 'mongoose';

@Module({
  providers: [
    {
      scope: Scope.DEFAULT,
      provide: DATABASE_CONNECTION_TOKEN,
      useFactory: (configService: ConfigService) => {
        const db_uri =
          configService.get<string>('MONGO_URI') ||
          'mongodb://localhost:27017/nodb';
        const connection = mongoose.createConnection(db_uri);
        connection.on('error', (error) => {
          console.log(
            error,
            'DB Connection error: Unable to connect to mongodb',
          );
        });
        connection.on('connected', () => {
          console.log('Connected to mongodb');
        });
        return connection;
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION_TOKEN],
})
export class MongoModule {}
