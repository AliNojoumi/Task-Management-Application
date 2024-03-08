import { IsEmail, IsString } from 'class-validator';

export class GetUsersWithFilter {
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;
}
