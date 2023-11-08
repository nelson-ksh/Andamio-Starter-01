import { CourseModule, CourseReferenceInfo, hashCourseModule, SLT } from "@andamiojs/core";
import Link from "next/link";
import AddLearnerPolicyIDModal from "../../../components/modals/course/AddLearnerPolicyIDModal";
import BurnCourseModuleTokenModal from "../../../components/modals/course/BurnCourseModuleTokenModal";
import CommitToAssignmentModal from "../../../components/modals/course/CommitToAssignmentModal";
import MintModuleTokenModal from "../../../components/modals/course/MintModuleTokenModal";
import getAssignment from "./utils/getAssignment";
import getOnchainCourseModule from "./utils/getOnchainCourseModule";

export default function CourseModuleDetailsCard(props: {
  courseJSON: CourseModule;
  onChainModules: CourseReferenceInfo;
}) {
  const moduleOnChain = getOnchainCourseModule(props.courseJSON, props.onChainModules);
  return (
    <div className="flex flex-col my-5" key={props.courseJSON.id}>
      <div className="flex flex-row py-5 px-5 justify-between bg-white text-black">
        <h3 className="text-2xl px-2">
          {props.courseJSON.id}: {props.courseJSON.title}
        </h3>
        {moduleOnChain ? (
          <div>&#127881; This Module is now on Cardano &#127881;</div>
        ) : (
          <MintModuleTokenModal courseModule={props.courseJSON} />
        )}
      </div>
      <div>
        {props.courseJSON.id == moduleOnChain?.data?.moduleId ? (
          <div className="bg-green-800 p-2">Module Id matches module token name</div>
        ) : (
          <div className="bg-red-800 p-2">Module Id does not match module token name</div>
        )}
      </div>
      <div className="bg-blue-100 text-black p-5">
        <p>Module Hash: {hashCourseModule(props.courseJSON)}</p>
        <p>On Chain Hash: {moduleOnChain?.data?.moduleHash}</p>
        <p>Assignment: {getAssignment(props.courseJSON, props.onChainModules)}</p>
        <p>Module CS: {moduleOnChain?.data?.moduleCS}</p>
        {moduleOnChain && (
          <div className="flex flex-row gap-6 py-3">
            <div>{<CommitToAssignmentModal selectedModuleUTxO={moduleOnChain} />}</div>
            <Link href={`/course/module/${moduleOnChain.data?.moduleId}/overview`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">
                Learn
              </button>
            </Link>
            <div>{<AddLearnerPolicyIDModal selectedModuleUTxO={moduleOnChain} />}</div>
            <BurnCourseModuleTokenModal selectedModuleUTxO={moduleOnChain} />
          </div>
        )}
      </div>
      <div className="p-5 text-xl border border-white">
        <ul className="list-disc pl-5">
          {props.courseJSON.slts.map((slt: SLT, index: number) => (
            <li className="font-light" key={index}>
              {slt.id}: {slt.slt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
