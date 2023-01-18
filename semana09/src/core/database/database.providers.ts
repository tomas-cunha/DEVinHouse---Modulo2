import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) | 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [
          __dirname + '/../../**/**/*.entity{.ts,.js}',
          'dist/**/**/*.entity.js',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
