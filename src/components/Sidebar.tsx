import Link from 'next/link';
import Accordion from './Accordion';
import { getModuleOverviewData } from '../lib/getModuleOverviewData';
import { ModuleOverview } from '@andamiojs/core';

export default async function Sidebar() {
  const moduleOverviewValues = await getModuleOverviewData();

  return (
    <div className="flex flex-col w-80 pl-1 pr-5 bg-gray-800 text-gray-200">
      <Link href={'/'} key="home-link" className="mt-3">
        <text className="px-3 py-1 uppercase tracking-wider font-extrabold text-3xl rounded-md">
          andamio
        </text>
      </Link>
      <div className="pt-5">
        {moduleOverviewValues.modules.map((module: ModuleOverview) => (
          <div
            key={module.id}
            className="mb-2 uppercase tracking-wider border-b border-orange-300"
          >
            <Accordion
              moduleId={module.id}
              moduleTitle={module.title}
              pageList={module.pages}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
