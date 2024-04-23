import type { Page } from '~/core/enums/page.enum';
import { UserHelper } from '~/core/helpers/user.helper';
import { useAuthStore } from '~/store/auth.store';



export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuthStore();

  if (to.name === 'login') {
    if (isAuthenticated) {
      return navigateTo('/');
    }

    return;
  }

  if (!isAuthenticated) {
    return navigateTo('/login');
  }

  if (!UserHelper.canAccess(to.name as Page)) {
    return navigateTo('/');
  }
});