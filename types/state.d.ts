import type { TAccount } from './account';
import type { TNullable } from './nullable';



export type TAuthState = {
  user: TNullable<TAccount>
  accessToken: TNullable<string>
  refreshToken: TNullable<string>
}