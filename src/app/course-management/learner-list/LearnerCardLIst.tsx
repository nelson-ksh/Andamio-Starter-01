import { LearnerReferenceUTxO, queryLearnerReferenceInfo } from "@andamiojs/core";
import { andamioConfig } from "../../../andamio/config";
import LearnerCard from "./LearnerCard";

export default async function LearnerCardList() {
  const learnerReferenceInfo = await queryLearnerReferenceInfo(andamioConfig);

  return (
    <div className="m-5 p-5 border border-black grid grid-cols-2 gap-5">
      {learnerReferenceInfo.utxos.map((learnerUTxO: LearnerReferenceUTxO, index) => (
        <LearnerCard learnerUTxO={learnerUTxO} key={index} />
      ))}
    </div>
  );
}
