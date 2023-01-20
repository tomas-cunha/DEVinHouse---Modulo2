import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { hashtagsProviders } from './hashtag.providers';

@Module({
  controllers: [HashtagController],
  providers: [...databaseProviders, ...hashtagsProviders, HashtagService],
})
export class HashtagModule {}
