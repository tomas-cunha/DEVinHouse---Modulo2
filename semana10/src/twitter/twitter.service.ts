import { Injectable, Inject } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTwitterDto } from './dto/update-twitter.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { TweetEntity } from './entities/tweet.entity';

@Injectable()
export class TwitterService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,

    @Inject('TWEET_REPOSITORY')
    private readonly tweetRepository: Repository<TweetEntity>,
  ) {}

  createTweet(createTweetDto: CreateTweetDto) {
    return new Promise(async (resolve, reject) => {
      try {
        let newTweet = this.tweetRepository.create();
        newTweet = { ...createTweetDto, ...newTweet };
        const { userId } = createTweetDto;
        const user = await this.userRepository.findOne({
          where: {
            id: userId,
          },
          relations: {
            tweets: true,
          },
        });
        user.addTweet(newTweet);
        await this.userRepository.save(user);
        resolve(newTweet);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  findAll() {
    return `This action returns all twitter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} twitter`;
  }

  update(id: number, updateTwitterDto: UpdateTwitterDto) {
    return `This action updates a #${id} twitter`;
  }

  remove(id: number) {
    return `This action removes a #${id} twitter`;
  }
}
