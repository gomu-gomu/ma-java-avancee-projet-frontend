export type TPage<T> = {
  data: T
  page: {
    size: number
    number: number
    totalPages: number
    totalElements: number
  }
};