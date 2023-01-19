import { Module } from '@nestjs/common';
import { CarrinhosService } from './carrinhos.service';
import { CarrinhosController } from './carrinhos.controller';
import { carrinhoProviders } from './carrinhos.providers';

@Module({
  controllers: [CarrinhosController],
  providers: [...carrinhoProviders, CarrinhosService],
})
export class CarrinhosModule {}
