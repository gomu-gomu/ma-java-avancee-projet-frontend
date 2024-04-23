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
      try {
        const body = await readBody<TUser & { jwt: string }>(event);
        const path = ['users', body.id];
        const params = { method: ApiMethod.Delete, body };

        await ApiHelper.request(path, params);
        return true;
      } catch (err) {
        return false;
      }
    }
  }
});