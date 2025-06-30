import { Static, Type } from '@sinclair/typebox';

export const UpdateBookmarkSchema = Type.Object({
  url: Type.Optional(Type.String({ minLength: 10, maxLength: 2048 })),
  title: Type.Optional(Type.String({ minLength: 3, maxLength: 200 })),
  description: Type.Optional(Type.String({ maxLength: 1000 })),
  tags: Type.Optional(Type.Array(Type.String({ minLength: 1 }))),
});

// Convert from sinclair schema to typescript object
export type UpdateBookmarkDto = Static<typeof UpdateBookmarkSchema>;
