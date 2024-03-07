export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  status: UserStatus;
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}
