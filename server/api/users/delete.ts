import type { TUser } from '~/types/user';

import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';



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