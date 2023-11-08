import type { Metadata } from "next";
import { Suspense } from "react";
import Sidebar from "../../components/Sidebar";
import Loading from "../Loading";

export const metadata: Metadata = {
  title: "Andamio PBL Course",
  description: "Learn about Andamio",
};

export default async function CourseLayout({ children }: { children: React.ReactNode }) {
  const loading = Loading();
  const SideBar = await Sidebar();

  return (
    <div className="flex flex-row">
      <Suspense fallback={loading}>
        <div>{SideBar}</div>
      </Suspense>
      {children}
    </div>
  );
}
