import { IsNumberString } from 'class-validator';

export class FindOneProductDTO {
  @IsNumberString(undefined, { message: 'O ID informado não é válido' })
  readonly id: number;
}
