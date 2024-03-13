import { Inject, OnModuleInit } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { UserCreated } from '@shared/shared/events/user-created.event';
import { ClientModuleName } from 'apps/users/src/config/client-module';
import { UserCreatedEvent } from 'apps/users/src/events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler
  implements IEventHandler<UserCreatedEvent>, OnModuleInit
{
  constructor(
    @Inject(ClientModuleName.RMQ) private rabbitMQClient: ClientProxy,
    @Inject(ClientModuleName.NATS) private natsClient: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.rabbitMQClient.connect();
  }

  handle(event: UserCreatedEvent) {
    this.rabbitMQClient.emit(
      UserCreated.name,
      new UserCreated(event.user.id, event.user.email),
    );
    this.natsClient.emit(
      UserCreated.name,
      new UserCreated(event.user.id, event.user.email),
    );
  }
}
