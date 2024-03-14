import { Post } from 'apps/posts/src/entities/post.entity';

export class FindPostCountQuery {
  constructor(public readonly userId: Post['userId']) {}
}
