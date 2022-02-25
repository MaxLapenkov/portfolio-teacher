export interface IQueryParams {
  size?: number;
  page?: number;
  id?: number;
  [key: string]: string | string[] | number | number[] | undefined;
}

export type TRequestStatus = "idle" | "loading" | "failed";
