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
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  async create(@Body() createHashtagDto: CreateHashtagDto) {
    try {
      return await this.hashtagService.create(createHashtagDto);
    } catch (error) {
      throw new HttpException(
        { detail: error.detail, code: error.code },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return this.hashtagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hashtagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHashtagDto: UpdateHashtagDto) {
    return this.hashtagService.update(+id, updateHashtagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hashtagService.remove(+id);
  }
}
