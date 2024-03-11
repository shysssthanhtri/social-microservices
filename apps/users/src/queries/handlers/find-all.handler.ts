import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'apps/users/src/entities/user.entity';
import { FindAllQuery } from 'apps/users/src/queries/find-all.query';
import { Model } from 'mongoose';

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async execute(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
