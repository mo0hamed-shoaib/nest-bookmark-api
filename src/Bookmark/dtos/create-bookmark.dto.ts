import { Static, Type } from '@sinclair/typebox';

export const CreateBookmarkSchema = Type.Object({
  url: Type.String({ minLength: 10, maxLength: 2048 }),
  title: Type.String({ minLength: 3, maxLength: 200 }),
  description: Type.Optional(Type.String({ maxLength: 1000 })),
  tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
});

export type CreateBookmarkDto = Static<typeof CreateBookmarkSchema>;
