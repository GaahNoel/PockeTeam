import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Pokemon } from 'src/pokemon/schemas/pokemon.schema';
import * as mongooseDelete from 'mongoose-delete';

@Schema()
export class Team extends Document {
  @Prop()
  name: string;

  @Prop()
  pokemons: Array<Pokemon>;
}

export const TeamSchema = SchemaFactory.createForClass(Team).plugin(
  mongooseDelete,
);
