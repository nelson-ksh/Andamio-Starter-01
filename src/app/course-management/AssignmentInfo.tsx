import { DataBox } from "../../components/ui/DataBox";
import { andamioConfig } from "../../andamio/config";
import React from "react";
import { queryAssignmentValidatorInfo } from "@andamiojs/core";

const AssignmentInfo = async () => {
  const AssignmentInfo = await queryAssignmentValidatorInfo(andamioConfig);
  return (
    <>
      <DataBox value={AssignmentInfo.utxos.length} label="Current Assignment Commitments" />
    </>
  );
};

export default AssignmentInfo;
