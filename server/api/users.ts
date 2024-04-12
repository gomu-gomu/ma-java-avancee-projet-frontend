import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

import type { TUIUser } from '~/types';
import type { TPage } from '~/types/page';
import type { UserType } from '~/types/user-type';



const config = useAppConfig();

function generateAvatar(seed: string): string {
  const avatar = createAvatar(identicon, { seed, });
  return avatar.toDataUriSync();
}

function buildUrl(endPoint: string, params: object): string {
  const queryParams = [];
  let url = `${config.api}/${endPoint}?`;

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      queryParams.push(`${key}=${value}`);
    }
  }

  return url + queryParams.join('&');
}

export default eventHandler(async (event) => {
  const { q, types, sort, order } = getQuery(event) as { q?: string, types: Array<UserType>, sort?: 'name' | 'email', order?: 'asc' | 'desc' };
  const page = 0;

  const url = buildUrl(`user/page/${page}`, { q, types, sort, order });
  console.log({ url });
  const users = await $fetch<TPage<Array<TUIUser>>>(url);

  return users.content
    .map((e, i) => ({
      id: i + 1,
      name: 'TODO',
      type: e.type,
      email: e.email,
      avatar: { src: generateAvatar(e.id) },
    }))
});