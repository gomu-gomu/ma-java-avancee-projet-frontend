import type { UserType } from '~/core/enums/user-type.enum';
import type { TNullable } from './nullable';



export type TProfile = {
  id: string
  email: string
  type: UserType
  avatar: string
  lastName: string
  firstName: string
  cne: TNullable<string>
  cin: TNullable<string>
  phone: TNullable<string>
};