import { CategoriaProduto } from 'src/utils/categoriaProduto.enum';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class Produto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsBoolean()
  disponivel = true;

  @IsEnum(CategoriaProduto)
  categoria: CategoriaProduto;
}
