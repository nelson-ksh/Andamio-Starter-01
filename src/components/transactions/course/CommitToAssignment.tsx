import { useWallet } from "@meshsdk/react";
import { CourseReferenceUTxO, prepareCommitToAssignmentTx } from "@andamiojs/core";
import { ChangeEvent, useState } from "react";
import { andamioConfig } from "../../../andamio/config";
import ErrorModal from "../../modals/ErrorModal";
import SuccessTxModal from "../../modals/SuccessTxModal";

const CommitToAssignment = (props: { selectedModuleUTxO: CourseReferenceUTxO; closeModal: () => void }) => {
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [studentAssignmentInfo, setStudentAssignmentInfo] = useState("");

  const { wallet, connected } = useWallet();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "inputStudentAssignmentInfo") {
      setStudentAssignmentInfo(value);
    }
  };

  if (connected) {
    const handleClick = async () => {
      try {
        const COMMIT_TO_ASSIGNMENT_TX = await prepareCommitToAssignmentTx(
          wallet,
          andamioConfig,
          props.selectedModuleUTxO,
          studentAssignmentInfo
        );
        const res = await COMMIT_TO_ASSIGNMENT_TX.runTx();
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
        <div className="font-extrabold mb-4 text-xl">Enter New Assignment Info</div>
        <div>
          <form>
            <table>
              <tr>
                <td>Assignment Info (string for the moment - add hashing next):</td>
                <td className="p-4">
                  <input
                    type="text"
                    name="inputStudentAssignmentInfo"
                    onChange={handleInputChange}
                    className="bg-slate-100 p-2 rounded-md text-slate-900"
                  />
                </td>
              </tr>
            </table>
          </form>
        </div>
        <button className="button-1" onClick={handleClick}>
          Confirm Your Assignment Tx
        </button>
      </>
    );
  }
  return <>Wallet not connected</>;
};

export default CommitToAssignment;
