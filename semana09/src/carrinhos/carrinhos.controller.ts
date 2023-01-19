import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductEntity } from 'src/produtos/entities/produto.entity';
import { CarrinhosService } from './carrinhos.service';
import { CheckoutDto } from './dto/compra-carrinho.dto';

@Controller('carrinhos')
export class CarrinhosController {
  constructor(private readonly carrinhosService: CarrinhosService) {}

  @Post()
  async addProuct(@Body() product: ProductEntity) {
    return await this.carrinhosService.addProduct(product);
  }

  @Get('produtos')
  async findProductsCarrinho() {
    return await this.carrinhosService.findProductsCarrinho();
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: number) {
    return await this.carrinhosService.removeProduct(id);
  }

  @Post('checkout')
  async checkout(@Body() checkoutinfo: CheckoutDto) {
    try {
      return await this.carrinhosService.checkout(checkoutinfo);
    } catch (error) {
      if (error.reason == 'Invalid payment info')
        throw new HttpException(
          { detail: error.reason },
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
