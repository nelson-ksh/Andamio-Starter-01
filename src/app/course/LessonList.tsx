import { getModuleOverviewData } from "../../lib/getModuleOverviewData";
import Link from "next/link";

export default async function LessonList() {
  const moduleOverviewValues = await getModuleOverviewData();

  return (
    <>
      <div className="flex flex-col text-primary-light-100 min-h-screen">
        <div className="flex flex-col p-10">
          {moduleOverviewValues.modules.map((module, index: number) => (
            <div className="flex flex-col" key={index}>
              <div className="py-3 font-extrabold flex uppercase">
                <Link href={`course/module/${module.id}`}>{module.id}</Link>
              </div>
              <div className="flex flex-row">
                {module.pages.map((page) => (
                  <div className="px-2" key={page.slug}>
                    <Link href={`/course/module/${module.id}/${page.slug}`}>
                      <div className="block rounded-md px-3 py-2 border border-primary-light-800 hover:text-primary-dark-300 hover:bg-primary-dark-700">
                        <div className="text-sm font-medium">{page.title}</div>
                        <div className="text-xs text-primary-light-500">Edited on: {page.lastEdited}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
