import { Injectable, Inject } from '@nestjs/common';
import { ProductEntity } from 'src/produtos/entities/produto.entity';
import { Repository } from 'typeorm';
import { CheckoutDto } from './dto/compra-carrinho.dto';

import { CarrinhoEntity } from './entities/carrinho.entity';

@Injectable()
export class CarrinhosService {
  constructor(
    @Inject('CARRINHO_REPOSITORY')
    private carrinhosRepository: Repository<CarrinhoEntity>,
  ) {}

  async addProduct(product: ProductEntity) {
    return new Promise(async (resolve, reject) => {
      try {
        const carrinho = await this.carrinhosRepository.findOne({
          where: { usuário: 'Tomás' },
          relations: {
            produtos: true,
          },
        });

        carrinho.addProduct(product);

        await this.carrinhosRepository.save(carrinho);
        await this.atualizarValorCarrinho();
        resolve(true);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  async atualizarValorCarrinho() {
    const cart = await this.carrinhosRepository.findOne({
      where: { usuário: 'Tomás' },
      relations: {
        produtos: true,
      },
    });

    const newTotal = cart.produtos.reduce((acc, { valor }) => acc + valor, 0);
    await this.carrinhosRepository.save({ ...cart, total: newTotal });
  }

  async findProductsCarrinho() {
    return new Promise(async (resolve, reject) => {
      try {
        const { produtos } = await this.carrinhosRepository.findOne({
          where: { usuário: 'Tomás' },
          relations: {
            produtos: true,
          },
        });

        resolve(produtos);
      } catch (error) {
        reject(error);
      }
    });
  }

  async removeProduct(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const carrinho = await this.carrinhosRepository.findOne({
          where: {
            usuário: 'Tomás',
          },
          relations: {
            produtos: true,
          },
        });

        carrinho.removeProduct(id);

        await this.carrinhosRepository.save(carrinho);
        resolve(true);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  async checkout(checkoutInfo: CheckoutDto) {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          checkoutInfo.paymentInfo.cardNumber != '4444 4444 4444 4444' ||
          checkoutInfo.paymentInfo.cvv !== '222' ||
          new Date().getTime() >
            new Date(checkoutInfo.paymentInfo.cardExpirationDate).getTime()
        ) {
          reject({ reason: 'Invalid payment info' });
        }
        const carrinho = await this.carrinhosRepository.findOne({
          where: { usuário: 'Tomás' },
          relations: { produtos: true },
        });
        const total = carrinho.produtos.reduce(
          (acc, { valor }) => valor + acc,
          0,
        );
        carrinho.clearCarrinho();
        await this.carrinhosRepository.save(carrinho);
        resolve({ ...checkoutInfo, total });
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }
}
