import { DataBox } from "../../components/ui/DataBox";
import { andamioConfig } from "../../andamio/config";
import React from "react";
import { queryLearnerReferenceInfo } from "@andamiojs/core";

const LearnerReferenceInfo = async () => {
  const LearnerReferenceInfo = await queryLearnerReferenceInfo(andamioConfig);
  return (
    <>
      <DataBox value={LearnerReferenceInfo.utxos.length} label="Number Contributors" />
    </>
  );
};

export default LearnerReferenceInfo;
