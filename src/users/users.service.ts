import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './user-dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { GetUsersWithFilter } from './user-dto/get-users-filter.dto';

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

  getUsersWithFilter(getUserWithFliterDto: GetUsersWithFilter): User[] {
    const { name, email } = getUserWithFliterDto;

    let users = this.getAllUsers();
    if (name || email) {
      users = users.filter((user) => {
        if (user.name.includes(name) || user.email.includes(email)) {
          return true;
        } else {
          return false;
        }
      });

      if (users.length == 0) {
        throw new NotFoundException('Could not find!');
      } else {
        return users;
      }
    }
  }

  deleteUserById(id: string): void {
    const foundUser = this.users.find((user) => user.id === id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist!');
    } else {
      this.users = this.users.filter((user) => user.id !== id);
    }
  }
}
