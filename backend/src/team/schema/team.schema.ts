import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaTypes } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

@Schema()
export class Team extends Document {
  @Prop()
  name: string;

  @Prop({ ref: 'Pokemon' })
  pokemons: Array<SchemaTypes.Types.ObjectId>;

  @Prop()
  private: boolean;
}

export const TeamSchema = SchemaFactory.createForClass(Team).plugin(
  mongooseDelete,
);
