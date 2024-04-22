import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '~/store/auth.store';

import type { TAccount } from '~/types/account';



const toast = useToast();

export class AuthHelper {
  private static async loadAccount(): Promise<void> {
    const { accessToken, isAuthenticated, load } = useAuthStore();

    if (isAuthenticated) {
      const token = jwtDecode(accessToken as string);
      const userId = (token as any).id;
      const { data } = await useFetch<TAccount>(`/api/account/${userId}`);

      load(data.value as TAccount);
    }
  }

  private static raiseToast(title: string, color: any): void {
    toast.add({ title, color, icon: 'i-heroicons-check-circle' });
  }

  public static onLoggedIn(): void {
    navigateTo('/');
    this.loadAccount();
    this.raiseToast('Logged-in successfully', 'green');
  }

  public static onLoggedOut(): void {
    navigateTo('/login');
    this.raiseToast('Logged-out successfully', 'blue');
  }
}