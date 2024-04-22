import { ApiHelper } from '~/core/helpers/api.helper';

import { UserType } from '~/core/enums/user-type.enum';
import { ApiMethod } from '~/core/enums/api-method.enum';

import type { TUser } from '~/types/user';
import type { TAccount } from '~/types/account';



export default eventHandler(async (event) => {
  switch (event.method) {
    case ApiMethod.Get: {
      const userId = event.context.params?.id as string;
      const path = ['users', userId];

      try {
        const user = await ApiHelper.fetch<TUser>(path);
        let username = user.email;

        switch (user.type) {
          case UserType.Teacher: {
            break;
          }

          case UserType.Parent: {
            break;
          }

          case UserType.Student: {
            break;
          }

          default: {
            username = user.email.split('@')[0];
          }
        }
        console.log((user as any)._links);

        return {
          username,
          id: user.id,
          email: user.email,
          type: UserType.Admin
        } as TAccount;
      } catch (err) {
        return false;
      }
    }
  }
});