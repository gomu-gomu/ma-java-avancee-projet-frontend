import { ApiMethod } from '~/types/api';
import { ApiHelper } from '~/core/helpers/api.helper';
import type { TLoginRequest, TLoginResponse } from '~/types/login';


export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      const login = await readBody<TLoginRequest>(event);
      const path = ['auth', 'login'];
      const params = { body: login, methods: ApiMethod.Post };

      try {
        const response = await ApiHelper.fetch<TLoginResponse>(path, params);
        return response;
      } catch (err) {
        return false;
      }
    }
  }
});