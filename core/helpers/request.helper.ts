import { useAuthStore } from '~/store/auth.store';
import { ApiMethod } from '~/core/enums/api-method.enum';



export class RequestHelper {
  public static fetch<T = any>(path: string, body?: object, queryParams?: object) {
    const { accessToken } = useAuthStore();
    const url = `/api/${path}`;
    const bodyData = { ...body, jwt: accessToken };
    const options: any = { method: ApiMethod.Post, body: bodyData };

    return useFetch<T>(url, { ...options, ...queryParams });
  }
}
