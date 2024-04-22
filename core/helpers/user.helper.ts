import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';



export class UserHelper {
  public static generateAvatar(seed: string): string {
    const avatar = createAvatar(identicon, { seed });
    return avatar.toDataUriSync();
  }
}