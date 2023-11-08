import { getModuleTitle } from '../../../../../lib/course';
import { LMSObjectMetadata } from '@andamiojs/core';

export default function ModuleBreadcrumbs({
  moduleId,
  frontmatter,
}: {
  moduleId: string;
  frontmatter: LMSObjectMetadata;
}) {
  const moduleTitle = getModuleTitle({ moduleId });

  return (
    <div className="mx-auto">
      <ol
        role="list"
        className="flex space-x-4 rounded-md bg-primary-dark-600 px-6 shadow"
      >
        <li className="flex">
          <div className="flex items-center">
            <a
              href="/"
              className="text-primary-light-200 hover:text-primary-light-400"
            >
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        <li className="flex">
          <div className="flex items-center">
            <svg
              className="h-full w-6 flex-shrink-0 text-primary-light-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a
              href={`/course/module/${moduleId}`}
              className="ml-4 text-sm uppercase font-medium text-primary-light-200 hover:text-primary-light-300 hover:font-extrabold"
            >
              Module {moduleId}: {moduleTitle}
            </a>
          </div>
        </li>
        <li className="flex">
          <div className="flex items-center">
            <svg
              className="h-full w-6 flex-shrink-0 text-primary-light-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a
              href={`#`}
              className="ml-4 text-sm font-medium text-primary-light-200 hover:text-primary-light-300  hover:font-extrabold"
            >
              <text className="uppercase">
                {frontmatter.title}: {frontmatter.description}
              </text>
            </a>
          </div>
        </li>
      </ol>
    </div>
  );
}
