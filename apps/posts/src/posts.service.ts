import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostInput } from 'apps/posts/src/dto/create-post.input';
import { Post, PostDocument } from 'apps/posts/src/entities/post.entity';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  create(createPostInput: CreatePostInput): Promise<Post> {
    const post = new this.postModel(createPostInput);
    return post.save();
  }

  findAll() {
    return this.postModel.find().exec();
  }

  findOne(id: number) {
    return this.postModel.findById(id).exec();
  }
}
