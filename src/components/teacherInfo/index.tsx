import React from "react";

import { useGetTeachersByClassQuery } from "api";
const TeacherInfo = () => {
  const { data, error, isLoading } = useGetTeachersByClassQuery(1);

  return (
    <div className="teacher-info">
      Инфа об учителе <b>{data?.[0]?.name}</b>
    </div>
  );
};

export default TeacherInfo;
