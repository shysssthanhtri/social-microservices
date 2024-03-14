import { AbstractEntityEvent } from '@shared/shared/events/entities/abstract-entity-event';

export abstract class AbstractPostsEvent extends AbstractEntityEvent {
  static routingKey = 'posts.#';
}
