import { UserStatus } from '../user.model';

export class CreateUserDto {
  name: string;
  password: string;
  email: string;
  status: UserStatus;
}
