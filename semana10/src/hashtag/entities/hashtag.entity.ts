import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'hashtags' })
export class HashtagEntity {
  @PrimaryGeneratedColumn()
  hashtagId: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/\B#\w*[a-zA-Z]+\w*/)
  @Column({ length: 20, unique: true })
  hashtag: string;
}
