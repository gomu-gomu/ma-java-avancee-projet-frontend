export type TApiParams<T = any> = {
  body: T
  method: ApiMethod
  queryParams: object
};

export enum ApiMethod {
  Get = 'GET',
  Put = 'PUT',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE'
}