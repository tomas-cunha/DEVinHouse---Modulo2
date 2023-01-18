import { CategoriaProduto } from 'src/utils/categoriaProduto.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column('float')
  valor: number;

  @Column()
  descricao: string;

  @Column()
  disponivel = true;

  @Column('int')
  categoria: CategoriaProduto;
}
