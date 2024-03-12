import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserRequest } from '@shared/shared/__generated/proto/posts';
import { User, UserDocument } from 'apps/posts/src/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createPostInput: CreateUserRequest): Promise<User> {
    const post = new this.userModel({
      ...createPostInput,
      _id: createPostInput.id,
    });
    return post.save();
  }
}
