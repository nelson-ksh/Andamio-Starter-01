"use client";

import React, { Suspense, useEffect, useState } from "react";
import Modal from "../Modal";
import { CourseReferenceUTxO, getConnectedTokenAsset } from "@andamiojs/core";
import Loading from "../../../app/Loading";
import CommitToAssignment from "../../transactions/course/CommitToAssignment";
import { useWallet } from "@meshsdk/react";
import { AssetExtended } from "@meshsdk/core";
import { andamioConfig } from "../../../andamio/config";

const CommitToAssignmentModal = (props: { selectedModuleUTxO: CourseReferenceUTxO }) => {
  const { connected, wallet } = useWallet();
  const [connectedLearner, setConnectedLearner] = useState<AssetExtended | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getLearnerToken() {
      if (connected) {
        const _res = await getConnectedTokenAsset(wallet, andamioConfig.tokens.learnerPolicyID);
        setConnectedLearner(_res);
      }
    }

    if (connected) {
      getLearnerToken();
    }
  }, [connected, wallet]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {connectedLearner && (
        <>
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Commit to Assignment
          </button>
          <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            content={
              <Suspense fallback={<Loading />}>
                <CommitToAssignment selectedModuleUTxO={props.selectedModuleUTxO} closeModal={closeModal} />
              </Suspense>
            }
          />
        </>
      )}
    </div>
  );
};

export default CommitToAssignmentModal;
