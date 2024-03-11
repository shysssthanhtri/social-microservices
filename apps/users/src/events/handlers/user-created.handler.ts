import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'apps/users/src/events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    console.log('User created event', event.user);
  }
}
