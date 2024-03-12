import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
  CreateUserRequest,
  CreateUserResponse,
} from '@shared/shared/__generated/proto/posts_pb';

@Controller()
export class PostsController {
  @GrpcMethod('PostsService', 'CreateUser')
  async createUser(
    data: CreateUserRequest.AsObject,
  ): Promise<CreateUserResponse.AsObject> {
    console.log({ data });
    return data;
  }
}
