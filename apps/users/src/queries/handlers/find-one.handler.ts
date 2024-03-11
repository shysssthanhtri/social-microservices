import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'apps/users/src/entities/user.entity';
import { FindOneQuery } from 'apps/users/src/queries/find-one.query';
import { Model } from 'mongoose';

@QueryHandler(FindOneQuery)
export class FindOneHandler implements IQueryHandler<FindOneQuery> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async execute({ id }: FindOneQuery): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
