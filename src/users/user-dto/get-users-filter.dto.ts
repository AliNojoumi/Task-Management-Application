import { IsOptional, IsString } from 'class-validator';

export class GetUsersWithFilter {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
