import { KeysOfType } from '@/types/helpers/keysOfType';
import { ContentfulLivePreview } from '@contentful/live-preview';
import { Asset, Entry, UnresolvedLink } from 'contentful';
import NextImage from 'next/image';
import { ComponentProps } from 'react';

type ImageField = Asset<undefined, string> | UnresolvedLink<'Asset'>;

type ImageProps<T extends Entry> = Omit<
  ComponentProps<typeof NextImage> & {
    entry: T;
    fieldName: Extract<KeysOfType<T['fields'], ImageField>, string>;
  },
  'src' | 'alt'
>;

function isResolvedLink(field: ImageField): field is Asset<undefined, string> {
  return field && typeof field === 'object' && 'fields' in field;
}

export function Image<T extends Entry>(props: ImageProps<T>) {
  const { entry, fieldName, ...rest } = props;

  const field = entry.fields[fieldName] as ImageField;

  if (!isResolvedLink(field)) {
    return null;
  }

  const restProps = {
    ...ContentfulLivePreview.getProps({
      entryId: entry.sys.id,
      fieldId: fieldName,
      locale: 'en-US'
    }),
    ...rest
  };

  return (
    <NextImage
      src={`https:${field?.fields?.file?.url}`}
      alt={(field.fields?.title as string) || 'Blog Hero Image'}
      width={field.fields?.file?.details.image?.width}
      height={field.fields?.file?.details.image?.height}
      {...restProps}
    />
  );
}
