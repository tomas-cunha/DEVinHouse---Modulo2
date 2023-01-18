import { Injectable, Inject } from '@nestjs/common';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { ILike, Repository } from 'typeorm';
import { ProductEntity } from '../entities/produto.entity';
import { FindOneProductDTO } from '../dto/find-one-product.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productRepository: Repository<ProductEntity>,
  ) {}

  passILike(obj) {
    const aux = { ...obj };
    Object.keys(obj).forEach((key, index) => {
      aux[key] = ILike(`%${obj[key]}%`);
    });
    console.log('-- aux --');
    console.log(aux);
    return aux;
  }

  async find(query?): Promise<ProductEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await this.productRepository.find({
            where: this.passILike(query),
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  create(createProdutoDto: CreateProdutoDto) {
    return 'This action adds a new produto';
  }

  async findOne(param: FindOneProductDTO): Promise<ProductEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await this.productRepository.findOne({
            where: {
              id: param.id,
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}
