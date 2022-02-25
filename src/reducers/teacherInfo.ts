import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getTeacherInfo } from "api";
import { ITeacherInfo, ITeacherInfoRequest, TRequestStatus } from "api/types";

export interface TeacherInfoState {
  data: ITeacherInfo[] | null;
  status: TRequestStatus;
}

const initialState: TeacherInfoState = {
  data: null,
  status: "idle",
};

export const getTeacherInfoAsync = createAsyncThunk(
  "teacher/getData",
  async ({ classId }: ITeacherInfoRequest) => {
    const response = await getTeacherInfo(classId);
    if (response.response) {
      return response.response;
    } else {
      throw new Error(response.error);
    }
  }
);

export const teacherInfoSlice = createSlice({
  name: "teacherInfo",
  initialState,
  reducers: {
    clearTeacherInfo: (state) => {
      state.data = null;
    },
    setTeacherInfo: (state, action: PayloadAction<ITeacherInfo[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTeacherInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export const { clearTeacherInfo, setTeacherInfo } = teacherInfoSlice.actions;

export const teacherInfo = (state: RootState) => state.teacherInfo;

export default teacherInfoSlice.reducer;
