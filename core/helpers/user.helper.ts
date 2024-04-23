import { createAvatar } from '@dicebear/core';
import type { Link } from '@nuxt/ui-pro/types';
import { identicon } from '@dicebear/collection';

import { Page } from '../enums/page.enum';
import { pages } from '../consts/pages.enum';
import { UserType } from '../enums/user-type.enum';

import { useAuthStore } from '~/store/auth.store';



export class UserHelper {
  public static generateAvatar(seed: string): string {
    const avatar = createAvatar(identicon, { seed });
    return avatar.toDataUriSync();
  }

  public static generateMenu<T extends Link & { id: string }>(links: Array<T>): Array<T> {
    return links
      .filter(link => this.canAccess(link.id as Page) ? link : null)
      .filter(e => e);
  }

  public static canAccess(page: Page): boolean {
    const { user } = useAuthStore();
    const pageNames = Object.values(Page);
    const type = (user?.type ?? -1) as UserType;

    if (!pageNames.includes(page)) {
      return true;
    }

    return Object.hasOwn(pages, type)
      ? pages[type].includes(page)
      : false;
  }

  public static getTypeLabel(type: UserType): string {
    switch (type) {
      case UserType.Admin: return 'users.types.admin';
      case UserType.Teacher: return 'users.types.teacher';
      case UserType.Parent: return 'users.types.parent';
      case UserType.Student: return 'users.types.student';
      default: return 'users.types.unknown';
    }
  }

  public static getTypeColor(type: UserType): string {
    switch (type) {
      case UserType.Admin: return 'red';
      case UserType.Teacher: return 'orange';
      case UserType.Parent: return 'green';
      case UserType.Student: return 'blue';
      default: return 'gray';
    }
  }

}