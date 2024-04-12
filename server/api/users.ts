import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

import type { TUser } from '~/types/user';



const config = useAppConfig();

function generateAvatar(seed: string): string {
  const avatar = createAvatar(identicon, { seed, });
  return avatar.toDataUriSync();
}

export default eventHandler(async (event) => {
  const { q, sort, order } = getQuery(event) as { q?: string, sort?: 'name' | 'email', order?: 'asc' | 'desc' };
  const users = await $fetch<Array<TUser>>(`${config.api}/user`);
  console.log('fetched', users.length);
  return users
    .filter((_, i) => i < 10)
    .map((e, i) => ({
      id: i + 1,
      name: 'TODO',
      status: e.type,
      email: e.email,
      avatar: { src: generateAvatar(e.id) },
    }))
    .filter((user) => {
      if (!q) return true;
      return user.name.search(new RegExp(q, 'i')) !== -1 || user.email.search(new RegExp(q, 'i')) !== -1;
    }).sort((a, b) => {
      if (!sort) return 0

      const aValue = a[sort]
      const bValue = b[sort]

      if (aValue < bValue) return order === 'asc' ? -1 : 1
      if (aValue > bValue) return order === 'asc' ? 1 : -1
      return 0
    })
});