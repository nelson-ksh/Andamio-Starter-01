"use client";

import { CourseModule, getConnectedTokenAsset } from "@andamiojs/core";
import { Suspense, useEffect, useState } from "react";
import Loading from "../../../app/Loading";
import Modal from "../Modal";

import MintCourseModuleToken from "../../transactions/course/MintCourseModuleToken";
import { useWallet } from "@meshsdk/react";
import { AssetExtended } from "@meshsdk/core";
import { andamioConfig } from "../../../andamio/config";

const MintModuleTokenModal = (props: { courseModule: CourseModule }) => {
  const { connected, wallet } = useWallet();
  const [connectedCourseCreator, setConnectedCourseCreator] = useState<AssetExtended | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getCourseCreator() {
      if (connected) {
        const _res = await getConnectedTokenAsset(wallet, andamioConfig.tokens.courseCreatorPolicyID);
        if (_res) {
          setConnectedCourseCreator(_res);
        }
      }
    }

    if (connected) {
      getCourseCreator();
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
      {connectedCourseCreator && (
        <>
          <button onClick={openModal} className="rounded-md p-2 border bg-green-800 text-green-100 text-base hover:bg-green-900" type="button">
            Mint this Module Token
          </button>
          <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            content={
              <Suspense fallback={<Loading />}>
                <MintCourseModuleToken courseModule={props.courseModule} closeModal={closeModal} />
              </Suspense>
            }
          />
        </>
      )}
    </div>
  );
};

export default MintModuleTokenModal;
