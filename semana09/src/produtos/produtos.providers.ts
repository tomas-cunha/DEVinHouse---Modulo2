import { DataSource } from 'typeorm';
import { ProductEntity } from './entities/Produto.entity';

export const productsProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductEntity),
    inject: ['DATA_SOURCE'],
  },
];
