import { useWallet } from "@meshsdk/react";
import { CourseModule, prepareMintCourseModuleTokenTx } from "@andamiojs/core";
import { ChangeEvent, useState } from "react";
import { andamioConfig } from "../../../andamio/config";
import ErrorModal from "../../modals/ErrorModal";
import SuccessTxModal from "../../modals/SuccessTxModal";

const MintCourseModuleToken = (props: { courseModule: CourseModule; closeModal: () => void }) => {
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [assignmentContent, setAssignmentContent] = useState("");

  const { wallet, connected } = useWallet();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "assignmentContent") {
      setAssignmentContent(value);
    }
  };

  if (connected) {
    const handleClick = async () => {
      try {
        const MINT_COURSE_MODULE_TOKEN_TX = await prepareMintCourseModuleTokenTx(
          wallet,
          andamioConfig,
          props.courseModule,
          assignmentContent
        );
        const res = await MINT_COURSE_MODULE_TOKEN_TX.runTx();
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
          <div className="font-extrabold mb-4 text-xl">What is the Assignment for this Module?</div>
          <div>
            <form>
              <input
                type="text"
                name="assignmentContent"
                onChange={handleInputChange}
                className="bg-slate-100 p-2 rounded-md text-slate-900"
              />
            </form>
          </div>
          <button
            onClick={handleClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit mt-6"
            type="button"
          >
            Mint Course Module Token
          </button>
        </div>
      </>
    );
  }
  return <>Wallet not connected</>;
};

export default MintCourseModuleToken;
