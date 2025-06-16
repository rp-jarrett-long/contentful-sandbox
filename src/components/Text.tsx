import { KeysOfType } from '@/types/helpers/keysOfType';
import { ContentfulLivePreview } from '@contentful/live-preview';
import { Entry } from 'contentful';
import { ComponentProps, createElement, JSX } from 'react';

type Tag<T extends keyof JSX.IntrinsicElements> = ComponentProps<T> & {
  tag: T;
};

type TextProps<T extends Entry> = (
  | Tag<'h1'>
  | Tag<'h2'>
  | Tag<'h3'>
  | Tag<'h4'>
  | Tag<'h5'>
  | Tag<'h6'>
  | Tag<'p'>
  | Tag<'span'>
  | Tag<'label'>
) & {
  entry: T;
  fieldName: Extract<KeysOfType<T['fields'], string>, string>;
  transform?: (value: string) => string;
};

export function Text<T extends Entry>(props: TextProps<T>) {
  const { fieldName, tag, entry, transform = (v) => v, ...rest } = props;

  const tagProps = {
    ...ContentfulLivePreview.getProps({
      entryId: entry.sys.id,
      fieldId: fieldName,
      locale: 'en-US'
    }),
    ...rest
  };

  const children = transform(
    typeof entry.fields[fieldName] === 'string' ? entry.fields[fieldName] : ''
  );

  return createElement(tag, tagProps, children);
}
