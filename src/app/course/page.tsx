import LessonList from "./LessonList";
import { Suspense } from "react";
import Loading from "../Loading";

export default async function CoursePage() {
    const AllLessons = await LessonList()

    return (
      <main
        className="flex flex-col items-center justify-center font-extrabold text-4xl"
        style={{ minHeight: "calc(100vh - 5rem)" }}
      >
        <h1>(course page)</h1>
        <Suspense fallback={<Loading />}>{AllLessons}</Suspense>
      </main>
    );
  }
