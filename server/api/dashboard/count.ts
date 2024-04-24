import type { TUser } from '~/types/user';

import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';
import { UserType } from '~/core/enums/user-type.enum';
import type { TResponse } from '~/types/response';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      try {
        const { jwt } = await readBody<{ jwt: string }>(event);
        const path = ['dashboard', 'count'];
        const params = { method: ApiMethod.Get, body: { jwt } };

        const data = await ApiHelper.request(path, params);
        return data;
      } catch (_) {
        return false;
      }
    }
  }
});