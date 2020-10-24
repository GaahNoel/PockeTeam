import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop()
  name: string;

  @Prop()
  moves: Array<string>;

  @Prop()
  type: string;

  @Prop()
  status: {
    hp: number;
    speed: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
  };

  @Prop()
  item: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
