import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'apps/posts/src/entities/post.entity';
import { User } from 'apps/posts/src/entities/user.entity';
import { FindPostCountQuery } from 'apps/posts/src/queries/find-post-count.query';
import { Model } from 'mongoose';

@QueryHandler(FindPostCountQuery)
export class FindPostCountHandler implements IQueryHandler<FindPostCountQuery> {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async execute({ userId }: FindPostCountQuery): Promise<User['postCount']> {
    return this.postModel.countDocuments({ userId }).exec();
  }
}
