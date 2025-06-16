import { KeysOfType } from '@/types/helpers/keysOfType';
import { ContentfulLivePreview } from '@contentful/live-preview';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  BLOCKS,
  type Document as RichTextDocument
} from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { ComponentProps } from 'react';

type RichTextProps<T extends Entry> = ComponentProps<'div'> & {
  entry: T;
  fieldName: Extract<
    KeysOfType<T['fields'], string | RichTextDocument | undefined>,
    string
  >;
};

function isDocument(obj: unknown): obj is RichTextDocument {
  return (
    typeof obj === 'object' &&
    (obj as RichTextDocument).nodeType === BLOCKS.DOCUMENT
  );
}

export async function RichText<T extends Entry>(props: RichTextProps<T>) {
  const { entry, fieldName, ...rest } = props;

  const bodyDocument =
    typeof entry.fields[fieldName] === 'string'
      ? await richTextFromMarkdown(entry.fields[fieldName])
      : entry.fields[fieldName];

  if (!isDocument(bodyDocument)) {
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

  return <div {...restProps}>{documentToReactComponents(bodyDocument)}</div>;
}
