import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "consts";
import { ITeacherInfo } from "./types";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getTeachersByClass: builder.query<ITeacherInfo[], number>({
      query: (classId) => `/teacher/${classId}`,
    }),
  }),
});

export const { useGetTeachersByClassQuery } = portfolioApi;
