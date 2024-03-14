import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostInput } from 'apps/posts/src/dto/create-post.input';
import { Post, PostDocument } from 'apps/posts/src/entities/post.entity';
import { User, UserDocument } from 'apps/posts/src/entities/user.entity';
import { FindAllQuery } from 'apps/posts/src/queries/find-all.query';
import { FindByUserIdQuery } from 'apps/posts/src/queries/find-by-user-id.query';
import { FindOneQuery } from 'apps/posts/src/queries/find-one.query';
import { FindPostCountQuery } from 'apps/posts/src/queries/find-post-count.query';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    if (!(await this.userModel.exists({ _id: createPostInput.userId }))) {
      throw new NotFoundException(
        `User with id ${createPostInput.userId} not found`,
      );
    }
    const post = new this.postModel(createPostInput);
    return post.save();
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
