import { TypeMainNavigationSkeleton } from '@/types/contentful';
import { contentfulClient } from '@/utils/contentfulClient';
import { isResolvedLink } from '@/utils/contentfulHelpers';
import Link from 'next/link';

async function getMainNavigation() {
  const entries = await contentfulClient.getEntries<TypeMainNavigationSkeleton>(
    {
      content_type: 'mainNavigation',
      include: 3
    }
  );

  const [mainNavigation] = entries.items || [];

  return mainNavigation;
}

export async function MainNavigation() {
  const mainNavigation = await getMainNavigation();

  if (!mainNavigation) {
    return null;
  }

  return (
    <nav className='py-4'>
      <ul className='flex gap-6'>
        {mainNavigation.fields.sections?.map((section, index) => {
          const sectionFields = isResolvedLink(section) ? section.fields : null;
          return (
            sectionFields && (
              <li
                key={index}
                className='mb-2 group relative'>
                <span className='font-semibold cursor-pointer'>
                  {sectionFields.title}
                </span>
                <ul className='pl-4 absolute hidden group-hover:block hover:block left-0 bg-white shadow-lg rounded z-10 min-w-max'>
                  {sectionFields.pages?.map(
                    (page, linkIndex) =>
                      isResolvedLink(page) && (
                        <li key={linkIndex}>
                          <Link
                            href={`/${page.fields.slug}`}
                            className='hover:underline block px-4 py-2 focus:outline-none'
                            tabIndex={0}>
                            {page.fields.title}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </li>
            )
          );
        })}
      </ul>
    </nav>
  );
}
