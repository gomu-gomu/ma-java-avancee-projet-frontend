import { defineStore } from 'pinia';
import type { TAuthState } from '~/types/state';
import type { TLoginResponse } from '~/types/login';



export const useAuthStore = defineStore('auth', {
  state: (): TAuthState => ({
    accessToken: null,
    refreshToken: null
  }),
  getters: {
    isAuthenticated: (state) => {
      return Boolean(state.accessToken && state.accessToken?.length > 0);
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