import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Blog } from 'src/modules/blog/entities/blog.entity';
import { Experience } from 'src/modules/experience/entities/experience.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { Setting } from 'src/modules/setting/entities/setting.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Media } from 'src/modules/upload/entities/media.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
config();
const configService = new ConfigService();

export const dbConfig: DataSourceOptions = {
  username: configService.getOrThrow<string>('DB_USER'),
  password: configService.getOrThrow<string>('DB_PASS'),
  host: configService.getOrThrow<string>('DB_HOST'),
  database: configService.getOrThrow<string>('DB_NAME'),
  type: 'postgres',
  entities: [Setting, User, Blog, Tag, Experience, Project, Media],
  synchronize: false,
  logging: true,
  migrations: ['dist/db/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dbConfig);
export default dataSource;
