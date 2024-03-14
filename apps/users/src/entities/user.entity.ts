import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AbstractEntity,
  AbstractEntitySchema,
} from '@shared/shared/abstract/abstract-entity';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema()
@Directive('@key(fields: "id")')
export class User extends AbstractEntity {
  @Prop({ required: true })
  @IsEmail()
  @Field()
  email: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema =
  SchemaFactory.createForClass(User).add(AbstractEntitySchema);
