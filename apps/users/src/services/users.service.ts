import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserCommand } from 'apps/users/src/commands/create-user.command';
import { CreateUserInput } from 'apps/users/src/dto/create-user.input';
import { User, UserDocument } from 'apps/users/src/entities/user.entity';
import { FindAllQuery } from 'apps/users/src/queries/find-all.query';
import { FindOneQuery } from 'apps/users/src/queries/find-one.query';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(createUserInput));
  }

  findAll() {
    return this.queryBus.execute(new FindAllQuery());
  }

  findOne(id: User['id']) {
    return this.queryBus.execute(new FindOneQuery(id));
  }
}
