import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrinhosService } from './carrinhos.service';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';

@Controller('carrinhos')
export class CarrinhosController {
  constructor(private readonly carrinhosService: CarrinhosService) {}

  @Post()
  create(@Body() createCarrinhoDto: CreateCarrinhoDto) {
    return this.carrinhosService.create(createCarrinhoDto);
  }

  @Get()
  findAll() {
    return this.carrinhosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrinhosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarrinhoDto: UpdateCarrinhoDto) {
    return this.carrinhosService.update(+id, updateCarrinhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrinhosService.remove(+id);
  }
}
