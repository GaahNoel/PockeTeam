import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schema/example.schema';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
