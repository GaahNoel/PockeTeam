import { Schema as SchemaTypes } from 'mongoose';

export class VerifyEmailDto {
  id: string;

  user: SchemaTypes.Types.ObjectId;
}
