import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'apps/users/src/dto/create-user.input';
import { User } from 'apps/users/src/entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserInput: CreateUserInput) {
    const user = new User();
    user.id = this.users.length + 1;
    user.email = createUserInput.email;
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
