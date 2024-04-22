import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

import type { TUIUser } from '~/types';
import type { TPage } from '~/types/page';
import type { TUser } from '~/types/user';
import type { UserType } from '~/core/enums/user-type.enum';
import type { TResponse } from '~/types/response';
import { ApiMethod } from '~/core/enums/api-method.enum';
import { ApiHelper } from '~/core/helpers/api.helper';



function generateAvatar(seed: string): string {
  const avatar = createAvatar(identicon, { seed });
  return avatar.toDataUriSync();
}

export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Get: {
      const { q, page, types, sort, order } = getQuery(event) as { q?: string, page: number, types: Array<UserType>, sort?: 'name' | 'email', order?: 'asc' | 'desc' };

      const pageNumber = Math.max(0, page - 1);
      const path = ['users', 'search', 'by-all'];
      const queryParams = { email: q, types, page: pageNumber, sort: [sort, order].join(',') };
      const response = await ApiHelper.fetch<TResponse<{ users: Array<TUser> }>>(path, { queryParams });

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

    case ApiMethod.Delete: {
      try {
        const user = await readBody<TUser>(event);
        const path = ['users', user.id];
        const params = { method: ApiMethod.Delete, body: user };

        await ApiHelper.fetch(path, params);
        return true;
      } catch (err) {
        return false;
      }
    }
  }
});