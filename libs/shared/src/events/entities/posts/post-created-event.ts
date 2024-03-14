import { AbstractPostsEvent } from '@shared/shared/events/entities/posts/abstract-post-event';

export class PostCreatedEvent extends AbstractPostsEvent {
  static routingKey = 'posts.created';
}
