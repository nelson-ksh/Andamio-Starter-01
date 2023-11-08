import { useWallet } from "@meshsdk/react";
import { prepareMintLearnerTokenTx } from "@andamiojs/core";
import { ChangeEvent, useState } from "react";
import { andamioConfig } from "../../../andamio/config";
import ErrorModal from "../../modals/ErrorModal";
import SuccessTxModal from "../../modals/SuccessTxModal";

const MintLearnerToken = (props: { closeModal: () => void }) => {
  const [formData, setFormData] = useState({
    tokenAlias: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { wallet, connected } = useWallet();
  if (connected) {
    const handleClick = async () => {
      try {
        const MINT_LEARNER_TOKEN_TX = await prepareMintLearnerTokenTx(wallet, andamioConfig, formData.tokenAlias);
        const res = await MINT_LEARNER_TOKEN_TX.runTx();
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
          <div className="font-extrabold mb-4 text-xl">Enter Token Alias</div>
          <div>
            <form>
              <input
                type="text"
                name="tokenAlias"
                value={formData.tokenAlias}
                onChange={handleInputChange}
                className="bg-slate-700 p-2 rounded-md font-extrabold"
              />
            </form>
          </div>
          <button
            onClick={handleClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit mt-6"
            type="button"
          >
            Confirm Mint
          </button>
        </div>
      </>
    );
  }
  return <>Wallet not connected</>;
};

export default MintLearnerToken;
