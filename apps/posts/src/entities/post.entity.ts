import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'apps/posts/src/entities/user.entity';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  body: string;

  @Field(() => String)
  @Prop({ required: true, type: String })
  @IsString()
  userId: User['id'];

  @Field(() => User)
  user: User;
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
