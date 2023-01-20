import { PartialType } from '@nestjs/mapped-types';
import { CreateTweetDto } from './create-tweet.dto';

export class UpdateTwitterDto extends PartialType(CreateTweetDto) {}
