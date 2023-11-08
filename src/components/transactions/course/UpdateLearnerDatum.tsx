import { useWallet } from "@meshsdk/react";
import { hexToString, LearnerReferenceUTxO, prepareUpdateLearnerDatumTx } from "@andamiojs/core";
import { ChangeEvent, useState } from "react";
import { andamioConfig } from "../../../andamio/config";
import ErrorModal from "../../modals/ErrorModal";
import SuccessTxModal from "../../modals/SuccessTxModal";

const UpdateLearnerDatum = (props: { learnerReferenceUTxO: LearnerReferenceUTxO; closeModal: () => void }) => {
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [studentInfo, setStudentInfo] = useState("");

  const { wallet, connected } = useWallet();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "inputStudentInfo") {
      setStudentInfo(value);
    }
  };

  if (connected) {
    const handleClick = async () => {
      try {
        const UPDATE_LEARNER_DATUM_TX = await prepareUpdateLearnerDatumTx(
          wallet,
          andamioConfig,
          props.learnerReferenceUTxO,
          studentInfo
        );
        const res = await UPDATE_LEARNER_DATUM_TX.runTx();
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
        <div className="flex flex-col py-10 items-center bg-gradient-br w-max p-24">
          <h3 className="py-3">About Learner</h3>
          {props.learnerReferenceUTxO.data?.matchConnectedAddress ? (
            <div className="p-2 my-5 bg-green-200 text-black">Address Matches</div>
          ) : (
            <div className="p-2 my-5 bg-red-200 text-black">Address Does Not Match</div>
          )}
          <div className="my-5">
            <form>
              <table>
                <tbody>
                  <tr>
                    <td>Enter New Student Info:</td>
                    <td className="p-4">
                      <input
                        type="text"
                        name="inputStudentInfo"
                        onChange={handleInputChange}
                        className="bg-slate-100 p-2 rounded-md text-slate-900"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Current Info: {hexToString(props.learnerReferenceUTxO.datum.fields[2])}</td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <button className="button-1 my-5" onClick={handleClick}>
            Confirm Update Student Info
          </button>
        </div>
      </>
    );
  }
  return <>Wallet not connected</>;
};

export default UpdateLearnerDatum;
