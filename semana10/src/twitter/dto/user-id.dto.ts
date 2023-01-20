import { IsNumber, Matches, IsOptional } from 'class-validator';

export class UserIdDto {
  @IsNumber()
  userId: number;

  @Matches(/\B#\w*[a-zA-Z]+\w*/)
  @IsOptional()
  hashtag: string;
}
