import { Inject, OnModuleInit } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import {
  POSTS_SERVICE_PACKAGE_NAME,
  PostsServiceClient,
} from '@shared/shared/__generated/proto/posts';
import { UserCreatedEvent } from 'apps/users/src/events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler
  implements IEventHandler<UserCreatedEvent>, OnModuleInit
{
  private postsServiceClient: PostsServiceClient;

  constructor(@Inject(POSTS_SERVICE_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.postsServiceClient = this.client.getService<PostsServiceClient>(
      POSTS_SERVICE_PACKAGE_NAME,
    );
  }

  handle(event: UserCreatedEvent) {
    this.postsServiceClient.createUser(event.user).subscribe({
      next: (data) => console.log({ data }),
      error: (error) => console.error(error),
      complete: () => console.log('done'),
    });
  }
}
