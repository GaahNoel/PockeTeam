import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  moves: Array<string>;

  @Prop()
  type: string;

  @Prop()
  stats: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
  };

  @Prop()
  item: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
