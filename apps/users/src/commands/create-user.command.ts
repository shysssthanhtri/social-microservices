import { CreateUserInput } from 'apps/users/src/dto/create-user.input';

export class CreateUserCommand {
  constructor(public readonly user: CreateUserInput) {}
}
