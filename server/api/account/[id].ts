import { ApiHelper } from '~/core/helpers/api.helper';

import { UserType } from '~/core/enums/user-type.enum';
import { ApiMethod } from '~/core/enums/api-method.enum';

import type { TUser } from '~/types/user';
import type { TAccount } from '~/types/account';



async function getUsername(user: TUser, type: 'teacher' | 'parent' | 'student', jwt: string): Promise<string> {
  const path = (user as any)._links[type].href;
  const data = await ApiHelper.request(path, { body: { jwt } });

  return `${data.firstName} ${data.lastName}`;
}

export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Post: {
      const { jwt } = await readBody<{ jwt: string }>(event);
      const userId = event.context.params?.id as string;
      const path = ['users', userId];

      try {
        const user = await ApiHelper.request<TUser>(path, { body: { jwt } });
        let username = user.email;

        switch (user.type) {
          case UserType.Teacher: {
            username = await getUsername(user, 'teacher', jwt);
            break;
          }

          case UserType.Parent: {
            username = await getUsername(user, 'parent', jwt);
            break;
          }

          case UserType.Student: {
            username = await getUsername(user, 'student', jwt);
            break;
          }

          default: {
            username = user.email.split('@')[0];
          }
        }

        return {
          username,
          id: user.id,
          type: user.type,
          email: user.email
        } as TAccount;
      } catch (err) {
        return false;
      }
    }
  }
});