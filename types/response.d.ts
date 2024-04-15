import type { TPage } from './page';

export type TResponse<T> = {
  _embedded: T
  _links: {
    first: { href: string }
    self: { href: string }
    next: { href: string }
    last: { href: string }
    profile: { href: string }
  }
  page: {
    size: number
    number: number
    totalPages: number
    totalElements: number
  }
}