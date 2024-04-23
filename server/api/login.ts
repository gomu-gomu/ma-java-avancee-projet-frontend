import type { TLoginRequest, TLoginResponse } from '~/types/login';

import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      const { jwt, ...login } = await readBody<TLoginRequest & { jwt: string }>(event);
      const path = ['auth', 'login'];
      const params = { body: login, method: ApiMethod.Post };

      try {
        const response = await ApiHelper.request<TLoginResponse>(path, params);
        return response;
      } catch (_) {
        return false;
      }
    }
  }
});