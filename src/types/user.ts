import type { User, Post, Bookmark } from '@prisma/client';

export type UserType = User & {
  posts?: Post[];
  bookmarks?: Bookmark[];
};
