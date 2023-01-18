import { Test, TestingModule } from '@nestjs/testing';
import { CarrinhosController } from './carrinhos.controller';
import { CarrinhosService } from './carrinhos.service';

describe('CarrinhosController', () => {
  let controller: CarrinhosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrinhosController],
      providers: [CarrinhosService],
    }).compile();

    controller = module.get<CarrinhosController>(CarrinhosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
