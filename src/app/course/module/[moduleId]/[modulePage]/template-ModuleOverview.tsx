import Link from 'next/link';
import { SLT } from '@andamiojs/core';
import { TemplateProps } from './common';
import styles from './ModuleOverview.module.css';
import { getModuleTitle, getSLTList } from '../../../../../lib/course';
import { getModuleOverviewData } from '../../../../../lib/getModuleOverviewData';

export default async function ModuleOverviewTemplate({
  moduleId,
  children,
}: TemplateProps) {
  const moduleOverviewValues = await getModuleOverviewData();
  const selectedModuleOverview = moduleOverviewValues.modules.find(
    (selectedModule) => selectedModule.id === moduleId,
  );

  const moduleTitle = getModuleTitle({ moduleId });
  const sltList = getSLTList({ moduleId });

  return (
    <>
      <div className="text-primary-light-100 min-h-screen">
        <div className="grid grid-cols-3 py-3">
          <header className="col-span-2 w-3/4 mx-auto font-extrabold my-10">
            <h3 className="text-yellow-300 text-lg py-2">
              Welcome to Module {moduleId}
            </h3>
            <h2 className="text-5xl">{moduleTitle}</h2>
            <div className="my-5">
              <h2 className="text-2xl font-bold py-3">
                Student Learning Targets
              </h2>
              {sltList.map((slt: SLT) => (
                <div className="my-4 text-xl font-normal" key={slt.id}>
                  {slt.id}: {slt.slt}
                </div>
              ))}
            </div>
          </header>
          <div className="grid grid-cols-1 gap-2 w-1/2 mx-auto">
            {selectedModuleOverview?.pages.map((page) => (
              <div className="" key={page.slug}>
                {page.type != 'ModuleOverview' && (
                  <Link
                    href={`/course/module/${selectedModuleOverview.id}/${page.slug}`}
                  >
                    <div className="block rounded-md px-3 py-3 border border-primary-light-800 hover:text-primary-light-100 hover:bg-primary-dark-600">
                      <div className="font-medium">{page.title}</div>
                      <div className="text-xs text-primary-light-400">
                        {page.description}
                      </div>
                      <div className="text-xs text-primary-light-500">
                        Edited on: {page.lastEdited}
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        <hr className="my-10" />
        <div className={styles.moduleOverviewContainer}>{children}</div>
      </div>
    </>
  );
}
