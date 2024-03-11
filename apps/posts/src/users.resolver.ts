import { ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from 'apps/posts/src/entities/post.entity';
import { User } from 'apps/posts/src/entities/user.entity';
import { PostsService } from 'apps/posts/src/posts.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly postsService: PostsService) {}

  @ResolveField(() => [Post])
  posts(user: User) {
    return this.postsService.findByUserId(user.id);
  }
}
