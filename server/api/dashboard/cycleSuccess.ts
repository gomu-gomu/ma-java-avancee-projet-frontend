import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      try {
        const { jwt } = await readBody<{ jwt: string }>(event);
        const path = ['dashboard', 'cycleSuccess'];
        const params = { method: ApiMethod.Get, body: { jwt } };

        const data = await ApiHelper.request(path, params);
        return data;
      } catch (_) {
        return false;
      }
    }
  }
});