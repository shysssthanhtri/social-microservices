import { AbstractUserEvent } from '@shared/shared/events/entities/users/abstract-user-event';

export class UserCreatedEvent extends AbstractUserEvent {
  static routingKey = 'users.created';
}
