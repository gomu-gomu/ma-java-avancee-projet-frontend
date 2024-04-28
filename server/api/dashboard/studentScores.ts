import { jwtDecode } from 'jwt-decode';

import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';

import type { TUser } from '~/types/user';
import type { TStudentScore } from '~/types/studentScore';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      try {
        const { jwt } = await readBody<{ jwt: string }>(event);
        const token = jwtDecode(jwt);
        const userId = (token as any).id;
        let path: Array<string>;

        path = ['users', userId];
        const user = await ApiHelper.request<TUser>(path, { body: { jwt } });
        const student = await ApiHelper.request((user as any)._links.student.href, { body: { jwt } });

        path = ['dashboard', 'studentScores', student.id];
        const info = await ApiHelper.request<Array<TStudentScore>>(path, { body: { jwt } });

        return info;
      } catch (_) {
        return false;
      }
    }
  }
});