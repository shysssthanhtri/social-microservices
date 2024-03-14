import { AbstractEntityEvent } from '@shared/shared/events/entities/abstract-entity-event';

export abstract class AbstractUserEvent extends AbstractEntityEvent {
  static routingKey = 'users.#';
}
