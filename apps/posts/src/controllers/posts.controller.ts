import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserCreated } from '@shared/shared/events/user-created.event';
import { UsersService } from 'apps/posts/src/services/users.service';

@Controller()
export class PostsController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern(UserCreated.name)
  async createUser(data: UserCreated) {
    return this.usersService.create(data);
  }
}
