import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

import { UserType } from '../enums/user-type.enum';



export class UserHelper {
  public static generateAvatar(seed: string): string {
    const avatar = createAvatar(identicon, { seed });
    return avatar.toDataUriSync();
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