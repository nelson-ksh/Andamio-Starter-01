import { DataBox } from "../../components/ui/DataBox";
import { andamioConfig } from "../../andamio/config";
import React from "react";
import { queryCourseReferenceInfo } from "@andamiojs/core";

const CourseReferenceInfo = async () => {
  const CourseReferenceInfo = await queryCourseReferenceInfo(andamioConfig);
  return (
    <>
      <DataBox value={CourseReferenceInfo.utxos.length} label="Number Modules" />
    </>
  );
};

export default CourseReferenceInfo;
