import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

import type { TAuthState } from '~/types/state';
import type { TLoginResponse } from '~/types/login';



export const useAuthStore = defineStore('auth', {
  state: (): TAuthState => ({
    accessToken: null,
    refreshToken: null
  }),
  persist: true,
  getters: {
    isAuthenticated: (state) => {
      if (!state.accessToken || state.accessToken?.length === 0) {
        return false;
      }

      const token = jwtDecode(state.accessToken);
      const expiration = token.exp ?? 0;
      const now = Date.now() / 1000;

      return now <= expiration;
    }
  },
  actions: {

    login(token: TLoginResponse) {
      this.accessToken = token.accessToken;
      this.refreshToken = token.refreshToken;
    },

    logout() {
      this.accessToken = null;
      this.refreshToken = null;
    }
  }
});