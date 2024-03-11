import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserCommand } from 'apps/users/src/commands/create-user.command';
import { User, UserDocument } from 'apps/users/src/entities/user.entity';
import { UserCreatedEvent } from 'apps/users/src/events/user-created.event';
import { Model } from 'mongoose';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand) {
    const user = await new this.userModel(command.user).save();
    this.eventBus.publish(new UserCreatedEvent(user));
    return user;
  }
}
