import { Post } from 'apps/posts/src/entities/post.entity';

export class FindByUserIdQuery {
  constructor(public readonly userId: Post['userId']) {}
}
