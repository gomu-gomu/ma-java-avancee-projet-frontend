import type { ApiMethod } from '~/core/enums/api-method.enum';



export type TApiParams<T = any> = {
  body: T
  method: ApiMethod
  queryParams: object
};
