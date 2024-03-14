import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'apps/posts/src/entities/post.entity';
import { FindByUserIdQuery } from 'apps/posts/src/queries/find-by-user-id.query';
import { Model } from 'mongoose';

@QueryHandler(FindByUserIdQuery)
export class FindByUserIdHandler implements IQueryHandler<FindByUserIdQuery> {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async execute({ userId }: FindByUserIdQuery): Promise<Post[]> {
    return this.postModel.find({ userId }).exec();
  }
}
