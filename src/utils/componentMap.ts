import { Link, LinkType } from 'contentful';
import { Blog } from '../components/Blog';
import { ElementType } from 'react';

export const componentMap: Record<Link<LinkType>['id'], ElementType> = {
  blogPost: Blog
};
