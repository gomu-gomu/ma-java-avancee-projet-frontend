export type TPage<T> = {
  content: T
  size: number
  last: boolean
  empty: boolean
  first: boolean
  number: number
  totalPages: number
  totalElements: number
  numberOfElements: number
  sort: { empty: boolean, sorted: false }
};