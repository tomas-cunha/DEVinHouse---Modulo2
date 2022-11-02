import { TipoCerveja } from './tipo-cervaj.enum';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class cerveja {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  nomeCervejaria: string;

  @IsNotEmpty()
  @IsEnum(TipoCerveja)
  tipo: TipoCerveja;
}
