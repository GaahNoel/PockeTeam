import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Example } from '../schema/example.schema';
import { ExampleController } from '../example.controller';
import { ExampleService } from '../example.service';

class ExampleModel {
  constructor() {
    return {
      title: 'hue'
    }
  }
}

describe('ExampleController', () => {
  let controller: ExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        ExampleService,
        {
          provide: getModelToken(Example.name),
          useValue: ExampleModel,
        },
      ]
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
