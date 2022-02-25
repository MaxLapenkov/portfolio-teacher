import { IQueryParams } from "api/types";

/**
 * Функция примает объект с параметрами запроса и преобразует его в строку, для последующей подставноки в url при get запросе
 * @param queryParams - объект содержащий параметры для формирования запроса
 */
export const getQueryString = (queryParams?: IQueryParams): string => {
  if (!queryParams) return "";

  let pageQueryArray: string[] = [];

  Object.keys(queryParams).forEach((key: string) => {
    const value = queryParams[key];
    if (value || typeof value === "boolean") {
      pageQueryArray = [
        ...pageQueryArray,
        `${key}=${encodeURIComponent(
          Array.isArray(value) ? value.join(",") : value
        )}`,
      ];
    }
  });

  return `?${pageQueryArray.join("&")}`;
};
