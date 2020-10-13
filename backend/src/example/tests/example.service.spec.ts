import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Example } from '../schema/example.schema';
import { ExampleService } from '../example.service';

class ExampleModel {
  constructor() {
    return {
      title: 'hue'
    }
  }
}

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        {
          provide: getModelToken(Example.name),
          useValue: ExampleModel,
        },
      ],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
