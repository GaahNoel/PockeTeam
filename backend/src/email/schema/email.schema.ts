import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongooseDelete from 'mongoose-delete';
import { Document, Schema as SchemaTypes } from 'mongoose';

@Schema()
export class Email extends Document {
  @Prop()
  token: string;

  @Prop({ ref: 'User' })
  user: SchemaTypes.Types.ObjectId;
}

export const EmailSchema = SchemaFactory.createForClass(Email).plugin(
  mongooseDelete,
);
