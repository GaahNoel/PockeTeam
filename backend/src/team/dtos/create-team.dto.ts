import { Schema as SchemaTypes } from 'mongoose';

export class CreateTeamDto {
  name: string;

  pokemon: Array<SchemaTypes.Types.ObjectId>;

  isPrivate: boolean;

  user: SchemaTypes.Types.ObjectId;

  stats?: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
  };

  favorite: boolean;
}
