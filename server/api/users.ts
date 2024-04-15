import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

import type { TUIUser } from '~/types';
import type { TPage } from '~/types/page';
import type { TUser } from '~/types/user';
import type { UserType } from '~/types/user-type';
import type { TResponse } from '~/types/response';



const config = useAppConfig();

function generateAvatar(seed: string): string {
  const avatar = createAvatar(identicon, { seed, });
  return avatar.toDataUriSync();
}

function buildUrl(endPoint: Array<string>, params?: object): string {
  const queryParams = [];
  let url = [config.api, ...endPoint].join('/');

  if (params) {
    url += '?';

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        queryParams.push(`${key}=${value}`);
      }
    }
  }

  return url + queryParams.join('&');
}

export default eventHandler(async (event) => {
  switch (event.method) {
    case 'GET': {
      const { q, page, types, sort, order } = getQuery(event) as { q?: string, page: number, types: Array<UserType>, sort?: 'name' | 'email', order?: 'asc' | 'desc' };

      const pageNumber = Math.max(0, page - 1);
      const url = buildUrl(['users', 'search', 'by-all'], { email: q, types, page: pageNumber, sort: [sort, order].join(',') });
      const response = await $fetch<TResponse<{ users: Array<TUser> }>>(url);

      return {
        page: response.page,
        data: response._embedded.users
          .map(e => ({
            id: e.id,
            type: e.type,
            email: e.email,
            password: e.email,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
            avatar: { src: generateAvatar(e.id) },
          }))
      } as TPage<Array<TUIUser>>;
    }

    case 'DELETE': {
      const user = await readBody<TUser>(event);
      const url = buildUrl(['users', user.id]);

      await $fetch(url, { method: 'DELETE' });
      return true;
    }
  }
});