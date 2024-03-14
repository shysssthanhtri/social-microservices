import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent as DomainPostCreatedEvent } from '@shared/shared/events/entities/posts/post-created-event';
import { PostCreatedEvent } from 'apps/posts/src/events/post-created.event';

@EventsHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  async handle(event: PostCreatedEvent) {
    await this.amqpConnection.publish(
      DomainPostCreatedEvent.exchange,
      DomainPostCreatedEvent.routingKey,
      new DomainPostCreatedEvent(event.post),
    );
  }
}
