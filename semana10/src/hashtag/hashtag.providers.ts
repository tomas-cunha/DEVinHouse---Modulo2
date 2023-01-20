import { DataSource } from 'typeorm';
import { HashtagEntity } from './entities/hashtag.entity';

export const hashtagsProviders = [
  {
    provide: 'HASHTAGS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(HashtagEntity),
    inject: ['DATA_SOURCE'],
  },
];
