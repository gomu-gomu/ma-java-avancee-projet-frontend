import type { TBase } from './base';
import type { UserType } from './user-type';

export type TUser = {
  email: string
  type: UserType
  password: string
} & TBase;