import { Schema as SchemaTypes } from 'mongoose';

export class CreateTeamDto {
  name: string;

  pokemon: Array<SchemaTypes.Types.ObjectId>;

  isPrivate: boolean;

  user: SchemaTypes.Types.ObjectId;
}
