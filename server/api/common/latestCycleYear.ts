import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      try {
        const { jwt } = await readBody<{ jwt: string }>(event);
        const path = ['dashboard', 'latestCycleYear'];
        const params = { method: ApiMethod.Get, body: { jwt } };
        const latestCycleYear = await ApiHelper.request<number>(path, params);

        return latestCycleYear;
      } catch (_) {
        return false;
      }
    }
  }
});