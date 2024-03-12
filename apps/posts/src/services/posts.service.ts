import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostInput } from 'apps/posts/src/dto/create-post.input';
import { Post, PostDocument } from 'apps/posts/src/entities/post.entity';
import { User, UserDocument } from 'apps/posts/src/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    if (!(await this.userModel.exists({ _id: createPostInput.userId }))) {
      throw new NotFoundException(
        `User with id ${createPostInput.userId} not found`,
      );
    }
    const post = new this.postModel(createPostInput);
    return post.save();
  }

  findAll() {
    return this.postModel.find().exec();
  }

  findOne(id: number) {
    return this.postModel.findById(id).exec();
  }

  findByUserId(userId: string) {
    return this.postModel.find({ userId }).exec();
  }

  findPostCount(userId: string) {
    return this.postModel.countDocuments({ userId }).exec();
  }
}
