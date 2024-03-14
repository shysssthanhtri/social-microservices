import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'apps/posts/src/entities/post.entity';
import { FindOneQuery } from 'apps/posts/src/queries/find-one.query';
import { Model } from 'mongoose';

@QueryHandler(FindOneQuery)
export class FindOneHandler implements IQueryHandler<FindOneQuery> {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async execute({ id }: FindOneQuery): Promise<Post> {
    return this.postModel.findById(id).exec();
  }
}
