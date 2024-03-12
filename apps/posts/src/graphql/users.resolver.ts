import { ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from 'apps/posts/src/entities/post.entity';
import { User } from 'apps/posts/src/entities/user.entity';
import { PostsService } from 'apps/posts/src/services/posts.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly postsService: PostsService) {}

  @ResolveField(() => [Post], { name: 'posts' })
  getPosts(user: User) {
    return this.postsService.findByUserId(user.id);
  }

  @ResolveField(() => Number, { name: 'postCount' })
  findPostCount(user: User) {
    return this.postsService.findPostCount(user.id);
  }
}
