import { Schema as SchemaTypes } from 'mongoose';

export class CreateTeamDto {
  name: string;

  pokemons: Array<SchemaTypes.Types.ObjectId>;

  private: boolean;
}
