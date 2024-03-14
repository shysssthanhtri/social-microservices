import { Post } from 'apps/posts/src/entities/post.entity';

export class PostCreatedEvent {
  constructor(public readonly post: Post) {}
}
