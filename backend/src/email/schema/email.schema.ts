import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongooseDelete from 'mongoose-delete';
import { Document } from 'mongoose';

@Schema()
export class Email extends Document {
  @Prop()
  token: string;

  @Prop({ ref: 'User' })
  user: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email).plugin(
  mongooseDelete,
);
