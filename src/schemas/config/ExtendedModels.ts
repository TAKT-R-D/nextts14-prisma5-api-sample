import { UserSchema } from '@/schemas/zod';
import { Ex } from './Commons';

/**
 * Extend model schema for openapi: add description, example
 */

export const UserModelSchema = UserSchema.extend({
  id: UserSchema.shape.id.describe('user id').openapi(Ex.cuid),
  userName: UserSchema.shape.userName
    .describe('unique user name')
    .openapi(Ex.name),
  imageUrl: UserSchema.shape.imageUrl.describe('user image').openapi(Ex.image),
  createdAt: UserSchema.shape.createdAt
    .describe('created date')
    .openapi(Ex.date),
  updatedAt: UserSchema.shape.updatedAt
    .describe('updated date')
    .openapi(Ex.date),
});
