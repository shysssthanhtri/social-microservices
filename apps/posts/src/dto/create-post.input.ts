import { InputType, PickType } from '@nestjs/graphql';
import { Post } from 'apps/posts/src/entities/post.entity';

@InputType()
export class CreatePostInput extends PickType(Post, ['body'], InputType) {}
