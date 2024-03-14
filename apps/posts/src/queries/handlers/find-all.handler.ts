import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from 'apps/posts/src/entities/post.entity';
import { FindAllQuery } from 'apps/posts/src/queries/find-all.query';
import { Model } from 'mongoose';

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery> {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async execute(): Promise<Post[]> {
    return this.postModel.find().exec();
  }
}
