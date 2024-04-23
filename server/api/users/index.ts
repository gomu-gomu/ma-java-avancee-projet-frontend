import type { TUIUser } from '~/types';
import type { TPage } from '~/types/page';
import type { TUser } from '~/types/user';
import type { TResponse } from '~/types/response';
import type { UserType } from '~/core/enums/user-type.enum';

import { ApiMethod } from '~/core/enums/api-method.enum';
import { ApiHelper } from '~/core/helpers/api.helper';
import { UserHelper } from '~/core/helpers/user.helper';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      const { jwt } = await readBody<{ jwt: string }>(event);
      const { q, page, types, sort, order } = getQuery(event) as { q?: string, page: number, types: Array<UserType>, sort?: 'name' | 'email', order?: 'asc' | 'desc' };

      const pageNumber = Math.max(0, page - 1);
      const path = ['users', 'search', 'by-all'];
      const queryParams = { email: q, types, page: pageNumber, sort: [sort, order].join(',') };
      const response = await ApiHelper.request<TResponse<{ users: Array<TUser> }>>(path, { queryParams, body: { jwt } });

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
            avatar: { src: UserHelper.generateAvatar(e.id) },
          }))
      } as TPage<Array<TUIUser>>;
    }
  }
});