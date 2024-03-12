/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "PostsService";

export interface CreateUserRequest {
  id: string;
  email: string;
}

export interface CreateUserResponse {
  id: string;
  email: string;
}

export const POSTS_SERVICE_PACKAGE_NAME = "PostsService";

export interface PostsServiceClient {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
}

export interface PostsServiceController {
  createUser(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;
}

export function PostsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PostsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PostsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const POSTS_SERVICE_NAME = "PostsService";
