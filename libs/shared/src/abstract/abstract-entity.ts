import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document, Schema } from 'mongoose';

@ObjectType()
export abstract class AbstractEntity extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type AbstractDocument = AbstractEntity & Document;
export const AbstractEntitySchema = new Schema(
  {},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);
