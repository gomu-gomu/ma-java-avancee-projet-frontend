import { jwtDecode } from 'jwt-decode';

import { ApiHelper } from '~/core/helpers/api.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';

import type { TUser } from '~/types/user';
import type { TProfile } from '~/types/profile';
import { UserType } from '~/core/enums/user-type.enum';
import { UserHelper } from '~/core/helpers/user.helper';



async function getDetails(user: TUser, type: 'teacher' | 'parent' | 'student', jwt: string): Promise<Partial<TProfile>> {
  const path = (user as any)._links[type].href;
  const data = await ApiHelper.request(path, { body: { jwt } });

  return {
    cin: data.cin,
    cne: data.cne,
    phone: data.phone,
    lastName: data.lastName,
    firstName: data.firstName
  };
}

export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      try {
        const { jwt } = await readBody<{ jwt: string }>(event);
        const token = jwtDecode(jwt);
        const userId = (token as any).id;

        const path = ['users', userId];
        const params = { method: ApiMethod.Get, body: { jwt } };

        const user = await ApiHelper.request<TUser>(path, params);
        let details: object = {};

        switch (user.type) {
          case UserType.Teacher: {
            details = await getDetails(user, 'teacher', jwt);
            break;
          }

          case UserType.Parent: {
            details = await getDetails(user, 'parent', jwt);
            break;
          }

          case UserType.Student: {
            details = await getDetails(user, 'student', jwt);
            break;
          }

          default: {
            details = {};
          }
        }

        return {
          ...details,
          id: user.id,
          type: user.type,
          email: user.email,
          avatar: UserHelper.generateAvatar(user.id)
        } as TProfile;
      } catch (_) {
        return false;
      }
    }
  }
});