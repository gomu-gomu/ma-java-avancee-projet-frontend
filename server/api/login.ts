import type { TLoginRequest, TLoginResponse } from '~/types/login';
import type { TResponse } from '~/types/response';



const config = useAppConfig();

function buildUrl(endPoint: Array<string>, params?: object): string {
  const queryParams = [];
  let url = [config.api, ...endPoint].join('/');

  if (params) {
    url += '?';

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        queryParams.push(`${key}=${value}`);
      }
    }
  }

  return url + queryParams.join('&');
}

function buildOptions(method: string): object {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBoYXJ2YXJkLmVkdSIsImlhdCI6MTcxMzczNzQwNiwiZXhwIjoxNzEzODIzODA2fQ.CspFiaorSdPF4-XKF7Qoo36Dm3sLFWxRUXOGdvA4xFA';
  const headers: Headers = new Headers();

  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Content-Type', `application/json`);

  return { method, headers };
}

export default eventHandler(async (event) => {
  switch (event.method) {
    case 'POST': {
      const login = await readBody<TLoginRequest>(event);
      const url = buildUrl(['auth', 'login']);
      const options = buildOptions('POST');

      try {
        const response = await $fetch<TLoginResponse>(url, { ...options, body: login });
        return response;
      } catch (err) {
        return false;
      }
    }
  }
});