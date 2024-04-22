import { useAuthStore } from '~/store/auth.store';



export default defineNuxtRouteMiddleware(to => {
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
});