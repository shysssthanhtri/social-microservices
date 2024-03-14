import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from 'apps/posts/src/commands/create-post.command';
import { CreatePostInput } from 'apps/posts/src/dto/create-post.input';
import { Post } from 'apps/posts/src/entities/post.entity';
import { FindAllQuery } from 'apps/posts/src/queries/find-all.query';
import { FindByUserIdQuery } from 'apps/posts/src/queries/find-by-user-id.query';
import { FindOneQuery } from 'apps/posts/src/queries/find-one.query';
import { FindPostCountQuery } from 'apps/posts/src/queries/find-post-count.query';

@Injectable()
export class PostsService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    return this.commandBus.execute(new CreatePostCommand(createPostInput));
  }

  findAll() {
    return this.queryBus.execute(new FindAllQuery());
  }

  findOne(id: Post['id']) {
    return this.queryBus.execute(new FindOneQuery(id));
  }

  findByUserId(userId: Post['userId']) {
    return this.queryBus.execute(new FindByUserIdQuery(userId));
  }

  findPostCount(userId: Post['userId']) {
    return this.queryBus.execute(new FindPostCountQuery(userId));
  }
}
