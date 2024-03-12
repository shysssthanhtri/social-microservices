import { Controller } from '@nestjs/common';
import {
  CreateUserRequest,
  CreateUserResponse,
  PostsServiceController,
  PostsServiceControllerMethods,
} from '@shared/shared/__generated/proto/posts';

@Controller()
@PostsServiceControllerMethods()
export class PostsController implements PostsServiceController {
  async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
    console.log({ data });
    return data;
  }
}
