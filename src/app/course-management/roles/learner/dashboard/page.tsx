import { Suspense, useState } from "react";
import MintLearnerToken from "../../../../../components/transactions/course/MintLearnerToken";
import ViewLearnerTokenData from "./ViewLearnerTokenData";

export default function LearnerDashboardPage() {
  return (
    <main className="flex flex-col items-center justify-center h-max">
      <div className="flex flex-col py-10 items-center min-w-full mt-1">
        <h1>Learner Dashboard</h1>
        <ViewLearnerTokenData />
      </div>
    </main>
  );
}
