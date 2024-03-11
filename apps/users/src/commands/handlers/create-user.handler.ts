import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserCommand } from 'apps/users/src/commands/create-user.command';
import { User, UserDocument } from 'apps/users/src/entities/user.entity';
import { Model } from 'mongoose';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async execute(command: CreateUserCommand) {
    const { user } = command;
    return new this.userModel(user).save();
  }
}
