//import { PostRelation, BookmarkRelation } from '@/schemas/prismaQuery/index';
import { PostRelation } from './PostSchema';
import { BookmarkRelation } from './BookmarkSchema';

export const UserRelation = {
  id: true,
  userName: true,
  imageUrl: true,
};

export const UserSelect = {};

export const UserInclude = {
  posts: {
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
    select: PostRelation,
  },
  bookmarks: {
    select: BookmarkRelation,
  },
  _count: {
    select: {
      posts: true,
      bookmarks: true,
    },
  },
};
