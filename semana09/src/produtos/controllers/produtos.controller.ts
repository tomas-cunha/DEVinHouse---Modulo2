import { Controller, Get, Post, Body, Param, Query, Res } from '@nestjs/common';
import { ProdutosService } from '../service/produtos.service';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { FindOneProductDTO } from '../dto/find-one-product.dto';
import { Response } from 'express';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ProductEntity } from '../entities/produto.entity';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  async findAll(): Promise<ProductEntity[]> {
    try {
      return this.produtosService.find();
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param() param: FindOneProductDTO,
    @Res() response: Response,
  ): Promise<ProductEntity> {
    try {
      const found = await this.produtosService.findOne(param);
      if (found) {
        response.status(HttpStatus.OK).send(found);
        return found;
      }
      response
        .status(HttpStatus.OK)
        .send(`Nenhum usuário encontrado com o ID ${param.id}`);
    } catch (error) {}
  }

  @Get('/findByFilter')
  async findByFilter(@Query() query): Promise<ProductEntity[]> {
    try {
      return this.produtosService.find(query);
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
