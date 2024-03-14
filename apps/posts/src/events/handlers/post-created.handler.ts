import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent } from 'apps/posts/src/events/post-created.event';

@EventsHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  async handle(event: PostCreatedEvent) {
    await this.amqpConnection.publish(
      'activities-exchange',
      'posts.created',
      event.post,
    );
  }
}
