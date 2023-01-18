import { Module } from '@nestjs/common';
import { ProdutosService } from './service/produtos.service';
import { ProdutosController } from './controllers/produtos.controller';
import { databaseProviders } from 'src/core/database/database.providers';

@Module({
  controllers: [ProdutosController],
  providers: [...databaseProviders, ProdutosService],
})
export class ProdutosModule {}
