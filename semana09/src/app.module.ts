import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { CarrinhosModule } from './carrinhos/carrinhos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ProdutosModule,
    CarrinhosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
