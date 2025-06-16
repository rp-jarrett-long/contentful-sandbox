import { MainNavigation } from '@/components/MainNavigation';
import { TypePageSkeleton } from '@/types/contentful';
import { componentMap } from '@/utils/componentMap';
import { contentfulClient } from '@/utils/contentfulClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

/** Next.js props for the current page. */
type PageProps = {
  params: Promise<{ slug: string[] }>;
};

/** Fetch the Contentful page entry based on the current URL. */
async function getPage(props: PageProps) {
  const { params: paramsPromise } = props;

  const params = await paramsPromise;

  const slug = params.slug ? params.slug.join('/') : 'home-page';

  const entries = await contentfulClient.getEntries<TypePageSkeleton>({
    content_type: 'page',
    include: 3,
    'fields.slug': slug
  });

  const [page] = entries?.items ?? [];

  return page;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const page = await getPage(props);

  if (!page) {
    return {
      title: 'Page Not Found | RP Demo Site',
      description: 'The page you are looking for does not exist.'
    };
  }

  return {
    title: `${page.fields.title} | RP Demo Site`
  };
}

export default async function Page(props: PageProps) {
  const page = await getPage(props);

  if (!page) {
    notFound();
  }

  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      <header className='container mx-auto px-5'>
        <MainNavigation />
      </header>
      <main className='my-8'>
        {page.fields?.body?.map((component, index) => {
          if (component.sys.type !== 'Entry') return null;
          const Component = componentMap[component.sys.contentType.sys.id];
          return (
            Component && (
              <Component
                key={index}
                entry={component}
              />
            )
          );
        })}
      </main>
      <footer className='bg-gray-800 text-white'>
        <div className='container mx-auto px-5 py-4'>
          <p>&copy; {new Date().getFullYear()} RP Demo Site</p>
        </div>
      </footer>
    </div>
  );
}
