import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','userName','imageUrl','createdAt','updatedAt']);

export default UserScalarFieldEnumSchema;
