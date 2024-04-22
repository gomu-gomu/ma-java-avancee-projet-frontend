import type { TApiParams } from '~/types/api';
import { ApiMethod } from '~/core/enums/api-method.enum';



const config = useAppConfig();

export class ApiHelper {

  private static readonly TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBoYXJ2YXJkLmVkdSIsImlhdCI6MTcxMzczNzQwNiwiZXhwIjoxNzEzODIzODA2fQ.CspFiaorSdPF4-XKF7Qoo36Dm3sLFWxRUXOGdvA4xFA';

  private static buildUrl(endPoint: Array<string>, params?: object): string {
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

  private static buildOptions(method: ApiMethod): object {
    const headers: Headers = new Headers();

    headers.append('Authorization', `Bearer ${this.TOKEN}`);
    headers.append('Content-Type', `application/json`);

    return { method, headers };
  }

  public static fetch<T = any>(path: Array<string>, params?: Partial<TApiParams>): Promise<T> {
    return new Promise((resolve, reject) => {
      const url = this.buildUrl(path, params?.queryParams);
      const options = {
        ...this.buildOptions(params?.method ?? ApiMethod.Get),
        body: params?.body
      };

      $fetch<T>(url, options).then(resolve as any).catch(reject);
    });
  }
}
