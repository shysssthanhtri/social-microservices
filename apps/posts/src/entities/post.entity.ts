import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
