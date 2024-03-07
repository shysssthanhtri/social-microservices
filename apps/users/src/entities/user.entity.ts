import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @IsEmail()
  @Field()
  email: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
