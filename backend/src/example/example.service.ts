import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Example } from './schema/example.schema';
import { CreateExampleDto } from './dtos/create-example.dto';
import { FindExampleDto } from './dtos/find-example.dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectModel(Example.name)
    private ExampleModel: Model<Example>,
  ) {}

  async create(createExampleDto: CreateExampleDto): Promise<Example> {
    const createdCat = new this.ExampleModel(createExampleDto);
    return createdCat.save();
  }

  async findOne(findExampleDto: FindExampleDto): Promise<Example> {
    return this.ExampleModel.findOne(findExampleDto).exec();
  }
}
