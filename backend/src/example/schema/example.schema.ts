import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Example extends Document {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  email: string;
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
