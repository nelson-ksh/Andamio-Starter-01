'use client';

import { usePathname } from 'next/navigation';

export default function CourseNavigation({
  sortedPaths,
}: {
  sortedPaths: string[];
}) {
  const path = usePathname();
  let currentPath = '';
  if (path?.includes('/course/module/')) {
    const startIndex =
      path.indexOf('/course/module/') + '/course/module/'.length;
    currentPath = path.substring(startIndex);
  }
  const index = sortedPaths.indexOf(currentPath);

  let prePath = null;
  let nextPath = null;

  if (index !== -1) {
    if (index > 0) {
      prePath = sortedPaths[index - 1];
    }
    if (index < sortedPaths.length - 1) {
      nextPath = sortedPaths[index + 1];
    }
  }

  return (
    <div className="mx-auto" key={index}>
      <div className="flex flex-row justify-between rounded-md bg-primary-dark-600 px-6 shadow py-3 ">
        {prePath ? (
          <div className="flex items-center">
            <a
              href={`/course/module/${prePath}`}
              className="text-sm uppercase font-medium text-primary-light-200 hover:text-primary-light-300 hover:font-extrabold"
            >
              &lt; Previous
            </a>
          </div>
        ) : null}

        {nextPath ? (
          <div className="flex items-center">
            <a
              href={`/course/module/${nextPath}`}
              className="text-sm uppercase font-medium text-primary-light-200 hover:text-primary-light-300 hover:font-extrabold"
            >
              Next &gt;
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
