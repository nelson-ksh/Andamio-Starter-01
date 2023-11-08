"use client";

import { resolvePaymentKeyHash } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import { getConnectedTokenAsset, hexToString, LearnerReferenceUTxO, queryIndividualLearnerData } from "@andamiojs/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import BurnLearnerReferenceTokensModal from "../../../../../components/modals/course/BurnLearnerReferenceTokensModal";
import MintLearnerTokenModal from "../../../../../components/modals/course/MintLearnerTokenModal";
import UpdateLearnerDatumModal from "../../../../../components/modals/course/UpdateLearnerDatumModal";
import { HeroBasic, HeroGrid, HeroSection } from "../../../../../components/ui/Hero";
import { andamioConfig } from "../../../../../andamio/config";

export default function ViewLearnerTokenData() {
  const { connected, wallet } = useWallet();
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [connectedLearnerToken, setConnectedLearnerToken] = useState<string | undefined>(undefined);
  const [learnerReferenceUTxO, setLearnerReferenceUTxO] = useState<LearnerReferenceUTxO | undefined>(undefined);

  useEffect(() => {
    async function getLearnerToken() {
      const token = await getConnectedTokenAsset(wallet, andamioConfig.tokens.learnerPolicyID);
      if (token) {
        setConnectedLearnerToken(token.unit);
      }
    }
    async function getConnectedAddress() {
      if (wallet) {
        const addr = await wallet.getChangeAddress();
        setAddress(addr);
      }
    }
    if (wallet) {
      getLearnerToken();
      getConnectedAddress();
    }
  }, [wallet]);

  useEffect(() => {
    async function getLearnerDatum() {
      if (connectedLearnerToken) {
        const _datum = await queryIndividualLearnerData(wallet, andamioConfig, connectedLearnerToken);
        if (_datum) {
          setLearnerReferenceUTxO(_datum);
        }
      } else if (wallet) {
        const _datum = await queryIndividualLearnerData(wallet, andamioConfig);
        if (_datum) {
          setLearnerReferenceUTxO(_datum);
        }
      }
    }
    if (wallet) {
      getLearnerDatum();
    }
  }, [connectedLearnerToken, wallet]);

  return (
    <div>
      <h1>Your Learner Token</h1>
      <pre>{connectedLearnerToken}</pre>
      {/* <pre>
        {learnerReferenceUTxO && learnerReferenceUTxO.data && JSON.stringify(learnerReferenceUTxO.data, null, 2)}
      </pre> */}
      <div className="flex flex-col my-5 py-10 items-center bg-slate-800 min-w-full">
        <HeroSection>
          <HeroBasic>
            <div className="px-5">
              <h1 className="text-4xl">Bio Stuff</h1>
              <p>some bio data</p>
            </div>
          </HeroBasic>
          <HeroGrid>
            {/* <Suspense fallback={<Loading />}>{LearnerReferenceHero}</Suspense> */}
            {connectedLearnerToken == undefined && learnerReferenceUTxO == undefined ? (
              <MintLearnerTokenModal />
            ) : (
              <>
                <div className="py-3 bg-slate-700">
                  <h1>Your Address</h1>
                  <p>
                    {learnerReferenceUTxO?.data?.matchConnectedAddress
                      ? "Matches your on-chain address"
                      : "Does not match!"}
                  </p>
                </div>
                <div className="py-3 bg-slate-700">
                  <h1>Your Learner Token</h1>
                  {/* Todo: There is more we could do here */}
                  {connectedLearnerToken ? (
                    <p>
                      {learnerReferenceUTxO?.data?.learnerCS == connectedLearnerToken?.substring(0, 56)
                        ? "Is Valid"
                        : "Does not match!"}
                    </p>
                  ) : (
                    <>
                      {address &&
                      learnerReferenceUTxO &&
                      learnerReferenceUTxO?.data?.rewardAddress.fields[0].fields[0] == resolvePaymentKeyHash(address)
                        ? "Will be sent back to this wallet"
                        : "Will not be sent to this wallet"}
                    </>
                  )}
                  {learnerReferenceUTxO && <BurnLearnerReferenceTokensModal learnerReferenceUTxO={learnerReferenceUTxO} />}
                </div>
              </>
            )}
          </HeroGrid>
        </HeroSection>
      </div>
      <div className="flex flex-col my-5 py-10 items-center bg-slate-800 min-w-full">
        <HeroSection>
          <HeroBasic>
            <div className="px-5">
              <h1 className="text-4xl">Learner Accomplishment Stuff</h1>
              <p>We want some summary data</p>
            </div>
          </HeroBasic>
          <HeroGrid>
            {/* <Suspense fallback={<Loading />}>{LearnerReferenceHero}</Suspense> */}
            <div className="py-3 bg-slate-700">
              <h1>Your Completed Assigments</h1>
              <p>List: {learnerReferenceUTxO?.data?.completedAssignments}</p>
            </div>
            <div className="py-3 bg-slate-700">
              <h1>Your Current Assigment</h1>
              <p>
                {learnerReferenceUTxO?.data?.currentAssignment &&
                  hexToString(learnerReferenceUTxO?.data?.currentAssignment)}
              </p>
            </div>
          </HeroGrid>
        </HeroSection>
      </div>
      <div className="flex flex-col my-5 py-10 items-center bg-slate-800 min-w-full">
        <HeroSection>
          <HeroBasic>
            <div className="px-5">
              <h1 className="text-4xl">Update Your Learner Token</h1>
              <Link className="button-1 p-3 w-full" href="#">
                DUMMY Update Your Learner Policy ID
              </Link>
              <>{learnerReferenceUTxO && <UpdateLearnerDatumModal learnerReferenceUTxO={learnerReferenceUTxO} />}</>
            </div>
          </HeroBasic>
          <HeroGrid>
            <div>
              <h2>Current Learner Info</h2>
              <p>{learnerReferenceUTxO?.data?.learnerInfo}</p>
            </div>
          </HeroGrid>
        </HeroSection>
      </div>
      <div className="flex flex-col my-5 py-10 items-center bg-slate-800 min-w-full">
        <HeroSection>
          <HeroBasic>
            <div className="px-5">
              <h1 className="text-4xl">Submit an Assignment</h1>
              <Link className="button-1 p-3 w-full" href="#">
                Add Info to This Assigment
              </Link>
            </div>
          </HeroBasic>
        </HeroSection>
      </div>
    </div>
  );
}
