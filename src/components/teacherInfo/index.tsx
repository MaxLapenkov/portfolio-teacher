import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getTeacherInfoAsync, teacherInfo } from "reducers";

const TeacherInfo = () => {
  const currentTeacher = useAppSelector(teacherInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentTeacher?.data) {
      getTeacherData(1);
    }
  }, []);

  const getTeacherData = (classId: number) => {
    dispatch(getTeacherInfoAsync({ classId }));
  };

  return (
    <div className="teacher-info">
      Инфа об учителе <b>{currentTeacher.data?.[0]?.name}</b>
    </div>
  );
};

export default TeacherInfo;
