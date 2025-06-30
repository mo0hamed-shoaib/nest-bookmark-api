import { Static, Type } from '@sinclair/typebox';

export const BookmarkResponseSchema = Type.Object({
  bookmark_id: Type.Optional(Type.String()),
  url: Type.Optional(Type.String()),
  title: Type.String(),
  description: Type.Optional(Type.String()),
  tags: Type.Optional(Type.Array(Type.String())),
  createdAt: Type.Optional(Type.String({ format: 'date-time' })),
  updatedAt: Type.Optional(Type.String({ format: 'date-time' })),
});

// Convert from sinclair schema to typescript object
export type BookmarkResponseDto = Static<typeof BookmarkResponseSchema>;
