import Link from "next/link";
import { Suspense } from "react";
import { HeroBasic, HeroGrid, HeroSection } from "../../components/ui/Hero";
import Loading from "../Loading";
import CourseReferenceInfo from "./CourseReferenceInfo";
import LearnerReferenceInfo from "./LearnerReferenceInfo";
import AssignmentInfo from "./AssignmentInfo";
import MintLearnerTokenModal from "../../components/modals/course/MintLearnerTokenModal";

export const dynamic = "force-dynamic";

const CourseManagement = async () => {
  const LearnerReferenceHero = await LearnerReferenceInfo();
  const CourseReferenceHero = await CourseReferenceInfo();
  const AssignmentHero = await AssignmentInfo();

  return (
    <main className="flex flex-col items-center justify-center h-max">
      <div className="flex flex-col my-5 py-10 items-center bg-slate-800 min-w-full">
        <div className="font-extrabold text-4xl mb-8">LearnerReference</div>
        <HeroSection>
          <HeroGrid>
            <Suspense fallback={<Loading />}>{LearnerReferenceHero}</Suspense>
          </HeroGrid>
          <HeroBasic>
            <div className="flex flex-col items-start ml-20">
              <div className="font-bold mb-2">For Everyone:</div>
              <Link className="btn btn-wide" href="/course-management/learner-list">
                View all Learners
              </Link>

              <div className="font-bold mt-4 mb-2">For Learners:</div>

              <MintLearnerTokenModal />
              <Link className="btn btn-wide" href="/course-management/roles/learner/dashboard">
                View Your Learner Token
              </Link>
            </div>
          </HeroBasic>
        </HeroSection>
      </div>
      <div className="flex flex-col mb-5 py-10 items-center bg-slate-800 min-w-full">
        <div className="font-extrabold text-4xl mb-8">Course Reference</div>
        <HeroSection>
          <HeroGrid>
            <Suspense fallback={<Loading />}>{CourseReferenceHero}</Suspense>
          </HeroGrid>
          <HeroBasic>
            <div className="flex flex-col items-start ml-20">
              <div className="font-bold mb-2">For Learners:</div>
              <Link className="btn btn-wide" href="/course-management/module-list">
                View Current Assignments + Modules
              </Link>
            </div>
            <div className="flex flex-col items-start ml-20">
              <div className="font-bold mb-2">For Admin:</div>
              <Link className="btn btn-wide" href="/course-management/module-list">
                Create, Manage, and Update Course
              </Link>
            </div>
          </HeroBasic>
        </HeroSection>
      </div>
      <div className="flex flex-col mb-5 py-10 items-center bg-slate-800 min-w-full">
        <div className="font-extrabold text-4xl mb-8">Assignment Validator</div>
        <HeroSection>
          <HeroGrid>
            <Suspense fallback={<Loading />}>{AssignmentHero}</Suspense>
          </HeroGrid>
          <HeroBasic>
            <div className="flex flex-col items-start ml-20">
              <div className="font-bold mb-2">For Deciders:</div>
              <Link className="btn btn-wide" href="/course-management/assignment-commitments">
                View All Current Assignment Commitments: Accept and Deny
              </Link>
            </div>
            <div className="flex flex-col items-start ml-20">
              <div className="font-bold mb-2">For Learners:</div>
              <Link className="btn btn-wide" href="/course-management/roles/learner/dashboard">
                View My Current Assignment Commitments
              </Link>
            </div>
          </HeroBasic>
        </HeroSection>
      </div>
      <div className="bg-slate-400 min-w-full">
        <h1 className="text-center py-5 text-4xl">Transaction Endpoints</h1>
        <div className="grid lg:grid-cols-3 w-5/6 mx-auto my-10 gap-10">
          <div className="card shadow-xl py-5 px-5 bg-slate-700">
            <h2 className="text-center pb-3 text-2xl">Course Owner + Admin</h2>
            <div className="flex flex-col gap-5 mx-auto">
              <Link className="btn" href="/course-management/roles/course-creator/dashboard">
                Mint a Course Module
              </Link>
              <Link className="btn" href="/course-management/roles/course-creator/dashboard">
                Update a Course Module
              </Link>
              <Link className="btn" href="/course-management/roles/course-creator/dashboard">
                Burn a Course Module
              </Link>
            </div>
          </div>
          <div className="card shadow-xl py-5 px-5 bg-slate-700">
            <h2 className="text-center pb-3 text-2xl">Deciders</h2>
            <div className="flex flex-col gap-5 mx-auto">
              <Link className="btn" href="/course-management/assignment-commitments">
                Accept an Assignment
              </Link>
              <Link className="btn" href="/course-management/assignment-commitments">
                Deny an Assignment
              </Link>
            </div>
          </div>
          <div className="card shadow-xl py-5 px-5 bg-slate-700">
            <h2 className="text-center pb-3 text-2xl">Learners</h2>
            <div className="flex flex-col gap-5 mx-auto">
              <Link className="btn" href="/course-management/roles/learner/mint">
                Mint a Learner Token
              </Link>
              <Link className="btn" href="/course-management/module-list">
                Commit to a Module Assignment
              </Link>
              <Link className="btn" href="/course-management/roles/learner/dashboard">
                Submit Assignment
              </Link>
              <Link className="btn" href="/course-management/roles/learner/dashboard">
                Update Your Learner Token
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseManagement;
