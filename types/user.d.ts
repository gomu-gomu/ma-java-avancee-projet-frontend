import type { TBase } from './base';
import type { UserType } from '../core/enums/user-type.enum';

export type TUser = {
  email: string
  type: UserType
  password: string
} & TBase;