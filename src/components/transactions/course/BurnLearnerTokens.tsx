import { useWallet } from "@meshsdk/react";
import { LearnerReferenceUTxO, prepareBurnLearnerReferenceTokenTx } from "@andamiojs/core";
import { useState } from "react";
import { andamioConfig } from "../../../andamio/config";
import ErrorModal from "../../modals/ErrorModal";
import SuccessTxModal from "../../modals/SuccessTxModal";

const BurnLearnerTokens = (props: { learnerReferenceUTxO: LearnerReferenceUTxO; closeModal: () => void }) => {
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { wallet, connected } = useWallet();
  if (connected) {
    const handleClick = async () => {
      try {
        const BURN_LEARNER_REFERENCE_TOKEN = await prepareBurnLearnerReferenceTokenTx(
          wallet,
          andamioConfig,
          props.learnerReferenceUTxO
        );
        const res = await BURN_LEARNER_REFERENCE_TOKEN.runTx();

        setTxHash(res);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(JSON.stringify(error));
        }
      }
    };
    return (
      <>
        {txHash !== "" ? <SuccessTxModal txHash={txHash} closeModal={props.closeModal} /> : null}
        {errorMessage !== "" ? <ErrorModal errorMessage={errorMessage} closeModal={props.closeModal} /> : null}
        <div className="flex flex-col py-10 items-center bg-gradient-br w-max p-24">
          <div className="font-extrabold mb-4 text-xl">You will burn your learner token and the reference token.</div>

          <button
            onClick={handleClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit mt-6"
            type="button"
          >
            Confirm Burn Learner Tokens
          </button>
        </div>
      </>
    );
  }
  return <>Wallet not connected</>;
};

export default BurnLearnerTokens;
