import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent as DomainUserCreatedEvent } from '@shared/shared/events/entities/users/user-created-event';
import { UserCreatedEvent } from 'apps/users/src/events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  async handle(event: UserCreatedEvent) {
    await this.amqpConnection.publish(
      DomainUserCreatedEvent.exchange,
      DomainUserCreatedEvent.routingKey,
      new DomainUserCreatedEvent(event.user),
    );
  }
}
