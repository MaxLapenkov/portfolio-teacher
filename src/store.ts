import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import teacherInfoReducer from "reducers/teacherInfo";

export const store = configureStore({
  reducer: {
    teacherInfo: teacherInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
