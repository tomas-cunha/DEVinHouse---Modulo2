import { Module } from '@nestjs/common';
import { CarrinhosService } from './carrinhos.service';
import { CarrinhosController } from './carrinhos.controller';

@Module({
  controllers: [CarrinhosController],
  providers: [CarrinhosService]
})
export class CarrinhosModule {}
