import { CreatePostInput } from 'apps/posts/src/dto/create-post.input';

export class CreatePostCommand {
  constructor(public readonly post: CreatePostInput) {}
}
