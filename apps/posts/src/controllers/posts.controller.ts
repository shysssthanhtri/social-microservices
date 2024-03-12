import { Controller } from '@nestjs/common';
import {
  CreateUserRequest,
  CreateUserResponse,
  PostsServiceController,
  PostsServiceControllerMethods,
} from '@shared/shared/__generated/proto/posts';
import { UsersService } from 'apps/posts/src/services/users.service';

@Controller()
@PostsServiceControllerMethods()
export class PostsController implements PostsServiceController {
  constructor(private readonly usersService: UsersService) {}

  async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
    return this.usersService.create(data);
  }
}
