import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }
}
