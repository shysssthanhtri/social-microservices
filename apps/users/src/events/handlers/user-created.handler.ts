import { Inject, OnModuleInit } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { ClientModuleName } from 'apps/users/src/config/client-module';
import { UserCreatedEvent } from 'apps/users/src/events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler
  implements IEventHandler<UserCreatedEvent>, OnModuleInit
{
  constructor(
    @Inject(ClientModuleName.RMQ) private rabbitMQClient: ClientProxy,
  ) {}

  onModuleInit() {
    this.rabbitMQClient.connect().then(() => {
      console.log('RMQ connected');
    });
  }

  handle(event: UserCreatedEvent) {
    this.rabbitMQClient.emit('user-created', event.user).subscribe({
      next: () => {
        console.log('User created event sent to RMQ');
      },
    });
  }
}
