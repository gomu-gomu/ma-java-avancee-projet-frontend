const config = useAppConfig();

export class UrlHelper {

  public static buildUrl(endPoint: Array<string>, params?: object): string {
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
}