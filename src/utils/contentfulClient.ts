import { createClient } from 'contentful';

const isPreviewMode = process.env.CONTENTFUL_PREVIEW_MODE === 'true';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: isPreviewMode
    ? process.env.CONTENTFUL_PREVIEW_API_TOKEN || ''
    : process.env.CONTENTFUL_DELIVERY_API_TOKEN || '',
  host: isPreviewMode ? 'preview.contentful.com' : undefined,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master'
});
