import { UrlHelper } from './url.helper';
import { ApiMethod } from '~/core/enums/api-method.enum';

import type { TApiParams } from '~/types/api';



export class ApiHelper {

  private static buildOptions(params?: Partial<TApiParams>): object {
    const headers: Headers = new Headers();
    const body = { ...(params?.body ?? {}) };

    if (Object.hasOwn(body, 'jwt')) {
      headers.append('Authorization', `Bearer ${body.jwt}`);
      delete body.jwt;
    }

    headers.append('Content-Type', `application/json`);

    const hasBody = Object.keys(body).length > 0;

    return {
      headers,
      body: hasBody ? params?.body : null,
      method: params?.method ?? ApiMethod.Get
    };
  }

  public static request<T = any>(path: string | Array<string>, params?: Partial<TApiParams>): Promise<T> {
    return new Promise((resolve, reject) => {
      const url = Array.isArray(path) ? UrlHelper.buildUrl(path, params?.queryParams) : path;
      const options = { ...this.buildOptions(params) };

      $fetch<T>(url, options).then(resolve as any).catch(reject);
    });
  }
}
