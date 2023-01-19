import { ProductEntity } from 'src/produtos/entities/produto.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'carrinhos' })
export class CarrinhoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Tomás' })
  usuário: string;

  @Column('float')
  valor: number;

  @ManyToMany(() => ProductEntity)
  @JoinTable({ name: 'carrinhos_produtos' })
  produtos: ProductEntity[];

  addProduct(product: ProductEntity) {
    if (this.produtos == null) {
      this.produtos = new Array<ProductEntity>();
    }
    this.produtos.push(product);
  }

  removeProduct(productId) {
    if (productId !== null) {
      this.produtos = this.produtos.filter(({ id }) => id != productId);
    }
  }

  clearCarrinho() {
    this.produtos = [];
  }
}
