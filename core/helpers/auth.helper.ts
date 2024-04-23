import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '~/store/auth.store';

import type { TAccount } from '~/types/account';
import { RequestHelper } from './request.helper';



const toast = useToast();

export class AuthHelper {
  private static async loadAccount(): Promise<void> {
    const { accessToken, isAuthenticated, load } = useAuthStore();

    if (isAuthenticated) {
      const token = jwtDecode(accessToken as string);
      const userId = (token as any).id;
      const { data } = await RequestHelper.fetch<TAccount>(`account/${userId}`);

      load(data.value as TAccount);
    }
  }

  private static raiseToast(title: string, color: any): void {
    toast.add({ title, color, icon: 'i-heroicons-check-circle' });
  }

  public static onLoggedIn(t: any): void {
    navigateTo('/');

    this.loadAccount();
    this.raiseToast(t('login.alerts.loggedIn'), 'green');
  }

  public static onLoggedOut(t: any): void {
    navigateTo('/login');
    this.raiseToast(t('login.alerts.loggedOut'), 'blue');
  }
}