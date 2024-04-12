import type { TUser } from './user';
import type { Avatar } from '#ui/types';

export type UserType = 'subscribed' | 'unsubscribed' | 'bounced';

export type TUIUser = {
  avatar?: Avatar
} & TUser;

export interface Mail {
  id: number
  unread?: boolean
  from: TUser
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: Avatar
}

export interface Notification {
  id: number
  unread?: boolean
  sender: TUser
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
