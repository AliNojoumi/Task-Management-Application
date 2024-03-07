export interface User {
  name: string;
  password: string;
  email: string;
  status: UserStatus;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  NOTACTIVE = 'NOT_ACTIVE',
}
