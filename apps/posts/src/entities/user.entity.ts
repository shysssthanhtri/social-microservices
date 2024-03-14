import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from 'apps/posts/src/entities/post.entity';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@extends')
@Schema()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => [Post])
  posts: Post[];

  @Field(() => Number)
  postCount: number;

  @Prop({ required: true })
  @IsEmail()
  email: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
