import { jwtDecode } from 'jwt-decode';

import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';

import type { TUser } from '~/types/user';
import type { TStudentInfo } from '~/types/studentInfo';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      const { jwt } = await readBody<{ jwt: string }>(event);
      const token = jwtDecode(jwt);
      const userId = (token as any).id;
      let path: Array<string>;

      try {
        path = ['users', userId];
        const user = await ApiHelper.request<TUser>(path, { body: { jwt } });
        const student = await ApiHelper.request((user as any)._links.student.href, { body: { jwt } });

        path = ['dashboard', 'info', 'student', student.id];
        const info = await ApiHelper.request(path, { body: { jwt } });

        return {
          year: info[0].year,
          grade: info[0].grade,
          sector: info[0].sector,
          class: info[0].className
        } as TStudentInfo;
      } catch (err) {
        return false;
      }
    }
  }
});