import React from 'react';

import ModuleBreadcrumbs from './ModuleBreadcrumbs';
import { getFrontmatter } from './common';
import AssignmentTemplate from './template-Assignment';
import LessonTemplate from './template-Lesson';
import ModuleOverviewTemplate from './template-ModuleOverview';
import ModulePageDetails from './modulePage-metadata';

import CourseNavigation from '../../../../../components/courseNavigation/CourseNavigation';
import { getSortedPaths } from '../../../../../components/courseNavigation/getSortedPaths';

import NotFound from '../../../../not-found';

type Props = {
  moduleId: string;
  modulePage: string;
};

export default async function ModulePageLayout({
  params,
  children, // will be a page or nested layout
}: {
  params: Props;
  children: React.ReactNode;
}) {
  const frontmatter = getFrontmatter(params);

  const layoutComponentMap = {
    Assignment: AssignmentTemplate,
    Lesson: LessonTemplate,
    ModuleOverview: ModuleOverviewTemplate,
  };

  // Assert that frontmatter.type is one of the known keys, if not redirect to NotFound
  const LayoutComponent = frontmatter
    ? layoutComponentMap[frontmatter.type as keyof typeof layoutComponentMap] ||
      NotFound
    : NotFound;

  if (frontmatter) {
    const asyncComponent: JSX.Element = await LayoutComponent({
      frontmatter: frontmatter,
      moduleId: params.moduleId,
      page: params.modulePage,
      children: children,
    });

    return (
      <section className="mx-6">
        {frontmatter && (
          <>
            <div className="py-4">
              <ModuleBreadcrumbs
                moduleId={params.moduleId}
                frontmatter={frontmatter}
              />
            </div>
            {frontmatter.type === 'ModuleOverview' ? (
              <React.Suspense>{asyncComponent}</React.Suspense>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <React.Suspense>{asyncComponent}</React.Suspense>
                </div>
                <div className="col-span-1 flex flex-col gap-4">
                  <ModulePageDetails frontmatter={frontmatter} />
                  {/* <ModuleChat frontmatter={frontmatter} /> */}
                </div>
              </div>
            )}
            <div className="py-4">
              <CourseNavigation sortedPaths={await getSortedPaths()} />
            </div>
          </>
        )}
      </section>
    );
  }

  return 'Page not found';
}
