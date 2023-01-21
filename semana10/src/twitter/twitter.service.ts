import { Injectable, Inject } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { TweetEntity } from './entities/tweet.entity';
import { FeedTweetDto } from './dto/tweet-feed.dto';
import { JwtPayloadUserDto } from 'src/core/auth/dto/user-payload.dto';
import { HashtagEntity } from 'src/hashtag/entities/hashtag.entity';

@Injectable()
export class TwitterService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,

    @Inject('TWEET_REPOSITORY')
    private readonly tweetRepository: Repository<TweetEntity>,

    @Inject('HASHTAGS_REPOSITORY')
    private hashtagsRepository: Repository<HashtagEntity>,
  ) {}

  createTweet(
    createTweetDto: CreateTweetDto,
    jwtPayloadUser: JwtPayloadUserDto,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const newTweet = this.tweetRepository.create(createTweetDto);
        const hashtags = this.getHashtags(newTweet.content);
        newTweet.addHashtags(hashtags);

        const { id } = jwtPayloadUser;
        const user = await this.userRepository.findOne({
          where: {
            id,
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

  getHashtags(tweet: string) {
    const hashtags = tweet
      .split(' ')
      .filter((word) => word.startsWith('#') && word.length > 1)
      .map((hashtag) => this.hashtagsRepository.create({ hashtag }));

    return hashtags;
  }

  async findFeed(): Promise<FeedTweetDto[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const tweets = await this.tweetRepository.find({
          relations: { user: true },
          order: { createdAt: 'DESC' },
          take: 20,
        });

        const feedTweets = tweets.map(this.getFormattedTweet);
        resolve(feedTweets);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  async findUserTweets(userId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const userTweets = await this.tweetRepository.find({
          relations: { user: true },
          where: { user: { id: userId } },
          order: { createdAt: 'DESC' },
        });
        const formattedTweets = userTweets.map(this.getFormattedTweet);
        resolve(formattedTweets);
      } catch (error) {
        reject(error);
      }
    });
  }

  getFormattedTweet = ({
    content,
    createdAt,
    user: { name, username },
  }): FeedTweetDto => ({
    name,
    username,
    content,
    createdAt,
  });

  linkHashtagToTweet(body) {
    return new Promise(async (resolve) => {
      const { tweetId, hashtagId } = body;

      const linkedTweet = this.tweetRepository.create({
        id: tweetId,
        hashtags: [{ hashtagId: hashtagId }],
      });

      this.tweetRepository.save(linkedTweet);
      resolve(true);
    });
  }

  findTweetsByHashtag(hashtag: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const tweets = await this.tweetRepository.find({
          relations: {
            hashtags: true,
          },
        });

        const tweetsWithHashtag = this.getTweetsWithHashtags(tweets, hashtag);

        resolve(tweetsWithHashtag);
      } catch (error) {
        reject(error);
      }
    });
  }

  getTweetsWithHashtags(tweets: TweetEntity[], searchedHashtag: string) {
    const checkIfHasHashTag = ({ hashtag }) =>
      hashtag === `#${searchedHashtag}`;

    const handleFilteringByHashtag = ({ hashtags }) =>
      hashtags.some(checkIfHasHashTag);

    return tweets.filter(handleFilteringByHashtag);
  }
}
