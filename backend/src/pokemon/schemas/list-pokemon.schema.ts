import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PokemonList extends Document {
  @Prop({ type: Array })
  list: Array<string>;
}

export const PokemonListSchema = SchemaFactory.createForClass(PokemonList);
