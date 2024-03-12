import { OnModuleInit } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { CreateUserInput } from 'apps/users/src/dto/create-user.input';
import { User } from 'apps/users/src/entities/user.entity';
import { UserCreatedEvent } from 'apps/users/src/events/user-created.event';
import { join } from 'path';
import { Observable } from 'rxjs';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler
  implements IEventHandler<UserCreatedEvent>, OnModuleInit
{
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'PostsService',
      protoPath: join(__dirname, '..', 'proto/posts.proto'),
    },
  })
  private client: ClientGrpc;

  private postsService: {
    createUser: (data: CreateUserInput) => Observable<User>;
  };

  onModuleInit() {
    this.postsService =
      this.client.getService<typeof this.postsService>('PostsService');
  }

  handle(event: UserCreatedEvent) {
    this.postsService.createUser(event.user).subscribe();
  }
}
