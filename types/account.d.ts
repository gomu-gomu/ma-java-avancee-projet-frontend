import type { UserType } from '~/core/enums/user-type.enum';



export type TAccount = {
  id: string
  email: string
  type: UserType
  username: string
};