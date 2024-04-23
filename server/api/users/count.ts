import type { TUser } from '~/types/user';

import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';
import { UserType } from '~/core/enums/user-type.enum';
import type { TResponse } from '~/types/response';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      try {
        let data: any;
        let path: Array<string>;
        const response: Record<string, number> = {};
        const { jwt } = await readBody<{ jwt: string }>(event);

        path = ['users', 'search', 'by-all'];
        const queryParams = { types: [UserType.Admin] };
        data = await ApiHelper.request<TResponse<{ users: Array<TUser> }>>(path, { queryParams, body: { jwt } });
        response.admins = data._embedded.users.length;

        path = ['teachers'];
        data = await ApiHelper.request<TResponse<{ teachers: Array<any> }>>(path, { body: { jwt } });
        response.teachers = data.page.totalElements;

        path = ['parents'];
        data = await ApiHelper.request<TResponse<{ parents: Array<any> }>>(path, { body: { jwt } });
        response.parents = data.page.totalElements;

        path = ['students'];
        data = await ApiHelper.request<TResponse<{ students: Array<any> }>>(path, { body: { jwt } });
        response.students = data.page.totalElements;

        return response;
      } catch (err) {
        return false;
      }
    }
  }
});