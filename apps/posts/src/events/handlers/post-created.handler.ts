import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent } from 'apps/posts/src/events/post-created.event';

@EventsHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {
  async handle(event: PostCreatedEvent) {
    console.log({ event });
  }
}
