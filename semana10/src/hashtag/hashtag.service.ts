import { Injectable, Inject } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { HashtagEntity } from './entities/hashtag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HashtagService {
  constructor(
    @Inject('HASHTAGS_REPOSITORY')
    private hashtagsRepository: Repository<HashtagEntity>,
  ) {}

  create(createHashtagDto: CreateHashtagDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const newHashtag = this.hashtagsRepository.create(createHashtagDto);
        await this.hashtagsRepository.save(newHashtag);
        resolve(newHashtag);
      } catch (error) {
        reject({ code: error.code, details: error.details });
      }
    });
  }

  findAll() {
    return `This action returns all hashtag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hashtag`;
  }

  update(id: number, updateHashtagDto: UpdateHashtagDto) {
    return `This action updates a #${id} hashtag`;
  }

  remove(id: number) {
    return `This action removes a #${id} hashtag`;
  }
}
