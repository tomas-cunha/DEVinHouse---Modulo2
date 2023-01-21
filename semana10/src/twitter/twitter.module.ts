import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { AuthService } from 'src/core/auth/auth.service';
import { databaseProviders } from 'src/core/database/database.providers';

@Module({
  controllers: [TwitterController],
  providers: [...databaseProviders, TwitterService, AuthService],
})
export class TwitterModule {}
