import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreatedEvent } from '@shared/shared/events/entities/users/user-created-event';
import { User, UserDocument } from 'apps/posts/src/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserCreatedHandler {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @RabbitSubscribe({
    exchange: UserCreatedEvent.exchange,
    routingKey: UserCreatedEvent.routingKey,
    queue: 'posts-service-queue',
  })
  async create({ entity: user }: UserCreatedEvent) {
    const post = new this.userModel(user);
    await post.save();
  }
}
