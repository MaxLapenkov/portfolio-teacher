export interface ApiResult<T, V> {
  response?: T;
  error?: V;
}

type IRequestOptions<T = undefined> = {
  path: string;
  requestBody?: any;
  requestHeader?: Record<string, string>;
};

export default class Api {
  protected prefix = "/app/";

  private token: string | undefined;

  private classLevel: string | undefined;

  constructor(prefix: string) {
    this.prefix = "https://lapenkov-portfolio-server.herokuapp.com";

    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.patch = this.patch.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  private request<T, R = undefined>(
    requestMethod: string,
    { path, requestBody, requestHeader }: IRequestOptions<T>
  ) {
    const headers: Record<string, string> = requestHeader || {
      "Content-Type": "application/json",
    };

    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    if (this.classLevel) headers.ClassLevel = this.classLevel;

    return fetch(`${this.prefix}${path}`, {
      method: requestMethod,
      body: requestHeader ? requestBody : JSON.stringify(requestBody),
      headers,
    })
      .then(async (response: Response) => {
        const contentTypeHeader = response.headers.get("content-type");
        if (!response.ok) {
          if (!contentTypeHeader?.includes("application/json")) {
            throw Object({ statusCode: response.status });
          }
          throw await response.json();
        }
        if (contentTypeHeader?.includes("application/json"))
          return response.json();

        if (contentTypeHeader?.includes("application/octet-stream")) {
          const result = await response.blob();
          return {
            fileName: response.headers
              .get("content-disposition")
              ?.split("filename=")?.[1],
            blob: result,
          };
        }
      })
      .then(
        (response: R) => ({ response }),
        (error: any) => ({ error })
      );
  }

  public async get<R = any>(path: string): Promise<ApiResult<R, any>> {
    return this.request<undefined, R>("GET", { path });
  }

  public async post<T, R>(
    path: string,
    requestBody: T,
    requestHeader?: any
  ): Promise<ApiResult<R, any>> {
    return this.request<T, R>("POST", { path, requestBody, requestHeader });
  }

  public async patch<T, R>(
    path: string,
    requestBody: T
  ): Promise<ApiResult<R, any>> {
    const nulledKeys = Object.entries(requestBody)
      .filter(([val]) => val === null || val === "")
      .map(([key]) => key);
    if (nulledKeys.length)
      path = `${path}${
        path.includes("?") ? "&" : "?"
      }clearFields=${nulledKeys}`;
    return this.request<T, R>("PATCH", { path, requestBody });
  }

  public async put<T, R>(
    path: string,
    requestBody: T,
    requestHeader?: any
  ): Promise<ApiResult<R, any>> {
    return this.request<T, R>("PUT", { path, requestBody, requestHeader });
  }

  public async delete<R>(path: string): Promise<ApiResult<R, any>> {
    return this.request<undefined, R>("DELETE", { path });
  }

  public setToken(token: string) {
    this.token = token;
  }

  public removeToken() {
    this.token = undefined;
  }
}
