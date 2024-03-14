import { Post } from 'apps/posts/src/entities/post.entity';

export class FindOneQuery {
  constructor(public readonly id: Post['id']) {}
}
