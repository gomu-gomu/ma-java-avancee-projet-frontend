import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';
import type { TLoginRequest, TLoginResponse } from '~/types/login';


export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      const login = await readBody<TLoginRequest>(event);
      const path = ['auth', 'login'];
      const params = { body: login, method: ApiMethod.Post };

      try {
        const response = await ApiHelper.fetch<TLoginResponse>(path, params);
        return response;
      } catch (err) {
        return false;
      }
    }
  }
});