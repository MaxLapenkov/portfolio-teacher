export interface ITeacherInfo {
  id: number;
  name: string;
  phone: string;
  gender: string;
  education: string;
  experience: number;
}

export interface ITeacherInfoRequest {
  classId: number;
}
