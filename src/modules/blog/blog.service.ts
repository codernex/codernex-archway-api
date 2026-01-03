import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Blog, BlogStatus } from './entities/blog.entity';
import { PaginationQueryDto } from 'src/core/dto/paginated-query.dto';

const map = new Map<string, string>();

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly repository: Repository<Blog>,
  ) {}
  create(createBlogDto: any) {
    const blog = this.repository.create(createBlogDto);

    return this.repository.save(blog);
  }

  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10, search } = query;

    const queryBuilder = this.repository.createQueryBuilder('b');

    // 1. Join relations for the archive view
    queryBuilder
      .leftJoinAndSelect('b.author', 'author')
      .leftJoinAndSelect('b.tags', 'tags');

    // 2. Apply Search Filter
    if (search) {
      queryBuilder.where(
        '(b.title ILIKE :q OR b.slug ILIKE :q OR b.excerpt ILIKE :q)',
        { q: `%${search}%` },
      );
    }

    // 3. Sorting (Default to newest first)
    queryBuilder.orderBy('b.createdAt', 'DESC');

    // 4. Apply Pagination Logic
    // skip = (page - 1) * limit
    queryBuilder.skip((page - 1) * limit).take(limit);

    // 5. Execute with Count
    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(opts: FindOptionsWhere<Blog>, ip: string) {
    if (opts.slug) {
      const key = `${ip}-${opts.slug as string}`;
      const hasInMap = map.get(key);

      if (!hasInMap) {
        map.set(key, opts.slug as string);
        await this.repository
          .createQueryBuilder()
          .update(Blog)
          .set({
            views() {
              return 'views + 1';
            },
          })
          .where('slug = :slug', { slug: opts.slug as string })
          .execute();
      }
    }
    return this.repository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.author', 'author')
      .leftJoinAndSelect('b.tags', 'tag')
      .where('b.slug = :slug', { slug: opts.slug })
      .getOneOrFail();
  }

  update(opts: FindOptionsWhere<Blog>, updateBlogDto: any) {
    return this.repository.update(opts, updateBlogDto);
  }

  getRecentArticles(limit: number = 5) {
    return this.repository.find({
      where: { status: BlogStatus.PUBLISHED },
      order: { publishedAt: 'DESC' },
      take: limit,
      select: [
        'id',
        'title',
        'slug',
        'excerpt',
        'featuredImage',
        'publishedAt',
        'readingTime',
        'views',
      ],
      relations: ['author', 'tags'],
    });
  }

  remove(id: string) {
    return this.repository.delete({ id });
  }
}
