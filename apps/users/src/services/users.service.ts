import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserCommand } from 'apps/users/src/commands/create-user.command';
import { CreateUserInput } from 'apps/users/src/dto/create-user.input';
import { User, UserDocument } from 'apps/users/src/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private commandBus: CommandBus,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(createUserInput));
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: User['id']) {
    return this.userModel.findById(id).exec();
  }
}
