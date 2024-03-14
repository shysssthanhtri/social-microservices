import { NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostCommand } from 'apps/posts/src/commands/create-post.command';
import { Post, PostDocument } from 'apps/posts/src/entities/post.entity';
import { User, UserDocument } from 'apps/posts/src/entities/user.entity';
import { PostCreatedEvent } from 'apps/posts/src/events/post-created.event';
import { Model } from 'mongoose';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ post: createPostInput }: CreatePostCommand) {
    if (!(await this.userModel.exists({ _id: createPostInput.userId }))) {
      throw new NotFoundException(
        `User with id ${createPostInput.userId} not found`,
      );
    }
    const post = await new this.postModel(createPostInput).save();
    this.eventBus.publish(new PostCreatedEvent(post));
    return post;
  }
}
