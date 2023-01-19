import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TwitterModule } from './twitter/twitter.module';
@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal: true 
    }),
    ProdutosModule, 
    UsuariosModule, TwitterModule
  ],
  controllers: [AppController],
  providers: [    
    AppService
  ],
})
export class AppModule {}
