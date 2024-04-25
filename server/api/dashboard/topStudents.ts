import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';
import { UserHelper } from '~/core/helpers/user.helper';

import type { TBestStudent, TBestStudentsResponse } from '~/types/bestStudent';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      try {
        const { jwt, max } = await readBody<{ jwt: string, max: number }>(event);
        let path = ['dashboard', 'topStudents'];
        let params = { method: ApiMethod.Get, body: { jwt }, queryParams: { max } } as any;

        const bestStudents = await ApiHelper.request<Array<TBestStudent>>(path, params);

        path = ['dashboard', 'latestCycleYear'];
        params = { method: ApiMethod.Get, body: { jwt } };
        const latestCycleYear = await ApiHelper.request<number>(path, params);

        return {
          latestCycleYear,
          bestStudents: bestStudents.map(e => ({
            sector: `${e.grade} ${e.sector}`,
            name: `${e.firstName} ${e.lastName}`,
            score: parseFloat(e.score.toFixed(2)),
            avatar: { src: UserHelper.generateAvatar(e.id) }
          }))
        } as TBestStudentsResponse;
      } catch (_) {
        return false;
      }
    }
  }
});