import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserDto } from './user-dto/create-user.dto';
import { GetUsersWithFilter } from './user-dto/get-users-filter.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): User {
    return this.userService.getUserById(id);
  }

  @Get()
  getUsers(@Query() getUsersWithFilter: GetUsersWithFilter): User[] {
    //if we have any filters defined, call usersService.getUsersWithFilter
    if (Object.keys(getUsersWithFilter).length) {
      return this.userService.getUsersWithFilter(getUsersWithFilter);
    } else {
      //otherwise, just get all users
      return this.userService.getAllUsers();
    }
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string): void {
    return this.userService.deleteUserById(id);
  }
}
