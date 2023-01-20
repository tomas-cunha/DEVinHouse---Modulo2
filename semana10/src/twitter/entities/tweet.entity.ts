import { HashtagEntity } from 'src/hashtag/entities/hashtag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'tweets_twitter' })
export class TweetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ width: 280 })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.tweets, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToMany(() => HashtagEntity)
  @JoinTable({ name: 'tweets_hashtags' })
  hashtags: HashtagEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  tweetInstance: Promise<UserEntity>;
}
