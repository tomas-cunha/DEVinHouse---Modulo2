import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/core/auth/auth.service';
import { UserIdDto } from './dto/user-id.dto';

@Controller('twitter')
export class TwitterController {
  constructor(
    private readonly twitterService: TwitterService,
    private readonly authService: AuthService,
  ) {}

  @Post('/tweet')
  async createTweet(@Body() createTweetDto: CreateTweetDto) {
    try {
      return await this.twitterService.createTweet(createTweetDto);
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.createUser(createUserDto);
    } catch (error) {
      return { code: error.code, detail: error.detail };
    }
  }

  @Get('feed')
  async findFeed() {
    try {
      return await this.twitterService.findFeed();
    } catch (error) {
      throw new HttpException({ detail: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user')
  async findUserTweets(@Query() query: UserIdDto) {
    try {
      const { userId } = query;
      console.log(userId);
      return await this.twitterService.findUserTweets(userId);
    } catch (error) {
      throw new HttpException({ detail: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':hashtag')
  async findTweetsByHashtag(@Param() param: { hashtag: string }) {
    const { hashtag } = param;
    return await this.twitterService.findTweetsByHashtag(hashtag);
  }

  @Post('link-hashtag')
  async linkHashtagToTweet(@Body() body) {
    return this.twitterService.linkHashtagToTweet(body);
  }
}
