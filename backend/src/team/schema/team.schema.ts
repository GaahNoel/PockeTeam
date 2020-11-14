import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaTypes } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

@Schema()
export class Team extends Document {
  @Prop()
  name: string;

  @Prop({ ref: 'Pokemon' })
  pokemon: Array<SchemaTypes.Types.ObjectId>;

  @Prop()
  isPrivate: boolean;

  @Prop({ ref: 'User' })
  user: SchemaTypes.Types.ObjectId;
}

export const TeamSchema = SchemaFactory.createForClass(
  Team,
).plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });
