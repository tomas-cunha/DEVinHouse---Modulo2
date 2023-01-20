import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTwitterDto } from './dto/update-twitter.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/core/auth/auth.service';
import { UserEntity } from './entities/user.entity';

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

  @Get()
  findAll() {
    return this.twitterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.twitterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTwitterDto: UpdateTwitterDto) {
    return this.twitterService.update(+id, updateTwitterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.twitterService.remove(+id);
  }
}
