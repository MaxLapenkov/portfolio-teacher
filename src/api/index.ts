import { apiPaths } from "consts";
import Api from "./Api";

export const api = new Api(apiPaths.BASE_URL);

export const getTeacherInfo = (classId: number) =>
  api.get(`/teacher/${classId}`);
