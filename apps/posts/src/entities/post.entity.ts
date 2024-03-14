import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AbstractEntity,
  AbstractEntitySchema,
} from '@shared/shared/abstract/abstract-entity';
import { User } from 'apps/posts/src/entities/user.entity';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema()
export class Post extends AbstractEntity {
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
export const PostSchema =
  SchemaFactory.createForClass(Post).add(AbstractEntitySchema);
