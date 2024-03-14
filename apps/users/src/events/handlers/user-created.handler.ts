import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'apps/users/src/events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  async handle(event: UserCreatedEvent) {
    await this.amqpConnection.publish(
      'activities-exchange',
      'users.created',
      event.user,
    );
  }
}
