'use client';

import { LMSObjectMetadata } from '@andamiojs/core';
import { Disclosure } from '@headlessui/react';
import { ArrowSmallDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Accordion({
  moduleId,
  moduleTitle,
  pageList,
}: {
  moduleId: string;
  moduleTitle: string;
  pageList: LMSObjectMetadata[];
}) {
  const path = usePathname();
  return (
    <Disclosure>
      {({ open }) => (
        <>
          {path && (
            <>
              <Disclosure.Button
                className={`inline-flex rounded-md px-4 py-1 mb-1 font-medium text-m hover:bg-primary-dark-300 ${
                  path.includes(`/course/module/${moduleId}`)
                    ? 'bg-primary-light-900'
                    : ''
                }`}
              >
                <div className="flex items-center">
                  <span className="pb-1 text-lg text-primary-light-100 text-left">
                    <text className="font-extrabold">{moduleId}:</text>{' '}
                    {moduleTitle}
                  </span>

                  <span className={`p-2 ${open ? 'rotate-180' : ''}`}>
                    <ArrowSmallDownIcon className="w-3 h-3" />
                  </span>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm ml-5 mb-1">
                {pageList.map((page: LMSObjectMetadata) => (
                  <Link
                    href={`/course/module/${moduleId}/${page.slug}`}
                    key={`page-link-${page.slug}`}
                  >
                    <div
                      key={page.title}
                      className={`block rounded-md px-3 py-2 m-1 text-m font-medium hover:text-primary-dark-700 hover:bg-primary-dark-300 ${
                        path.includes(`/course/module/${moduleId}/${page.slug}`)
                          ? 'bg-primary-dark-700'
                          : ''
                      }`}
                    >
                      {page.title}
                    </div>
                  </Link>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </>
      )}
    </Disclosure>
  );
}
