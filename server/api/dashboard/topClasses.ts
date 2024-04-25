import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';

import type { TBestClass, TBestClassesResponse } from '~/types/bestClass';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      try {
        const { jwt, max } = await readBody<{ jwt: string, max: number }>(event);
        let path = ['dashboard', 'topClasses'];
        let params = { method: ApiMethod.Get, body: { jwt }, queryParams: { max } } as any;

        const bestClasses = await ApiHelper.request<Array<TBestClass>>(path, params);

        path = ['dashboard', 'latestCycleYear'];
        params = { method: ApiMethod.Get, body: { jwt } };
        const latestCycleYear = await ApiHelper.request<number>(path, params);

        return {
          latestCycleYear,
          topClasses: bestClasses.map(e => ({
            label: `${e.grade} ${e.sector} ${e.className}`,
            value: parseFloat(e.successRate.toFixed(2))
          }))
        } as TBestClassesResponse;
      } catch (_) {
        return false;
      }
    }
  }
});