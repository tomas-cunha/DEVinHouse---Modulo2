import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Query,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/core/auth/auth.service';
import { UserIdDto } from './dto/user-id.dto';
import { CredentialsDTO } from 'src/core/auth/dto/credentiasl.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/strategy/jwt-auth.guard';

@Controller('twitter')
export class TwitterController {
  constructor(
    private readonly twitterService: TwitterService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/tweet')
  async createTweet(@Body() createTweetDto: CreateTweetDto, @Request() req) {
    try {
      return await this.twitterService.createTweet(createTweetDto, req.user);
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const { email, password } = await this.authService.createUser(
        createUserDto,
      );
      const credentials: CredentialsDTO = { email, password };
      return await this.signIn(credentials);
    } catch (error) {
      return { code: error.code, detail: error.detail };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('feed')
  async findFeed() {
    try {
      return await this.twitterService.findFeed();
    } catch (error) {
      throw new HttpException({ detail: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':hashtag')
  async findTweetsByHashtag(@Param() param: { hashtag: string }) {
    const { hashtag } = param;
    return await this.twitterService.findTweetsByHashtag(hashtag);
  }

  @UseGuards(JwtAuthGuard)
  @Post('link-hashtag')
  async linkHashtagToTweet(@Body() body) {
    return this.twitterService.linkHashtagToTweet(body);
  }

  @Post('/auth/signin')
  async signIn(@Body(ValidationPipe) credentialsDto: CredentialsDTO) {
    return await this.authService.signIn(credentialsDto);
  }
}
