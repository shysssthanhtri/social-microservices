import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'apps/posts/src/entities/post.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@extends')
export class User {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => [Post])
  posts: Post[];

  @Field(() => Number)
  postCount: number;
}
