import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './user-dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  createUser(createUserDto: CreateUserDto): User {
    const { name, password, email, status } = createUserDto;

    const user: User = {
      id: uuidv4(),
      name,
      password,
      email,
      status,
    };

    this.users.push(user);
    return user;
  }

  getUserById(id: string): User {
    const foundUser = this.users.find((user) => user.id === id);

    if (!foundUser) {
      throw new NotFoundException(`User with this id : "${id}" not found`);
    } else {
      return foundUser;
    }
  }
}
