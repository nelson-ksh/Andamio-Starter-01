import { useWallet } from "@meshsdk/react";
import { AssignmentUTxO, hexToString, prepareStudentRemoveAssignmentTx } from "@andamiojs/core";
import { useState } from "react";
import { andamioConfig } from "../../../andamio/config";
import ErrorModal from "../../modals/ErrorModal";
import SuccessTxModal from "../../modals/SuccessTxModal";

const StudentRemoveAssignment = (props: { assignment: AssignmentUTxO; closeModal: () => void }) => {
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { wallet, connected } = useWallet();
  if (connected) {
    const handleClick = async () => {
      try {
        const REMOVE_ASSIGMENT_TX = await prepareStudentRemoveAssignmentTx(wallet, andamioConfig, props.assignment);
        const res = await REMOVE_ASSIGMENT_TX.runTx();
        console.log(res);
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
        <div>
          <h1 className="p-5">Assignment: {hexToString(props.assignment.datum.fields[0])}</h1>
          <button className="button-1" onClick={handleClick}>
            Confirm Tranasaction
          </button>
        </div>
      </>
    );
  }
  return <>Wallet not connected</>;
};

export default StudentRemoveAssignment;
