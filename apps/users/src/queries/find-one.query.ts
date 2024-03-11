import { User } from 'apps/users/src/entities/user.entity';

export class FindOneQuery {
  constructor(public readonly id: User['id']) {}
}
