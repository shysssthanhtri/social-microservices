import { InputType, PickType } from '@nestjs/graphql';
import { User } from 'apps/users/src/entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, ['email'], InputType) {}
