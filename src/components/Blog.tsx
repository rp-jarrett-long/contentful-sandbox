import { TypeBlogPost } from '@/types/contentful';
import { ContentfulLivePreview } from '@contentful/live-preview';
import { Image } from './Image';
import { RichText } from './RichText';
import { Text } from './Text';

type BlogProps = {
  entry: TypeBlogPost<undefined, string>;
};

export async function Blog(props: BlogProps) {
  // console.log('Blog props:', props);
  const { entry } = props;

  return (
    <section className='container mx-auto px-5'>
      <Image
        entry={entry}
        fieldName='heroImage'
      />
      <div className='grid md:grid-cols-[2fr_1fr] gap-8 mt-8'>
        <article className='prose'>
          <Text
            entry={entry}
            fieldName='title'
            tag='p'
          />
          <RichText
            entry={entry}
            fieldName='body'
          />
          <RichText
            entry={entry}
            fieldName='richBody'
          />
        </article>
        <aside className='bg-gray-100 p-4 rounded h-fit'>
          <h2 className='text-lg font-semibold'>Post Details</h2>
          <p>
            <strong>Published on:</strong>{' '}
            <Text
              entry={entry}
              tag='span'
              fieldName='publishDate'
              transform={(v) => new Date(v).toLocaleDateString()}
            />
          </p>
          <div>
            <strong>Description:</strong>{' '}
            <RichText
              className='prose-sm'
              entry={entry}
              fieldName='description'
            />
          </div>
          <div>
            <strong>Tags:</strong>
            <ul
              className='list-disc pl-5'
              {...ContentfulLivePreview.getProps({
                entryId: entry.sys.id,
                fieldId: 'tags',
                locale: 'en-US'
              })}>
              {entry.fields.tags?.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
