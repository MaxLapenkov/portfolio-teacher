import { IQueryParams } from "api/types/common";

export const apiPaths: Record<string, string> = {
  ATTACHMENT: "/attachment",
  BASE_URL: "/app",
  FOS: "/fos",
  PORTFOLIO: "/portfolio",
  REFERENCE: "/reference",
  SETTINGS: "/settings",
  STUDENT: "/persons",
  EMPLOYEE: "/employee",
  USERS: "/users",
  SEARCH: "/search",
};

export const DEFAULT_PAGE_SIZE = 50;
export const MAX_PAGE_SIZE = 9999;
export const DEFAULT_PAGE_NUMBER = 0;

export const DEFAULT_QUERY_PARAMS: IQueryParams = {
  size: DEFAULT_PAGE_SIZE,
  page: DEFAULT_PAGE_NUMBER,
};
