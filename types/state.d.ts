import type { TNullable } from './nullable';



export type TAuthState = {
  accessToken: TNullable<string>
  refreshToken: TNullable<string>
}