import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class FeedTweetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
}
