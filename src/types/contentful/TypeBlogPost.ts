import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypePersonSkeleton } from "./TypePerson";

export interface TypeBlogPostFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    heroImage: EntryFieldTypes.AssetLink;
    description: EntryFieldTypes.Text;
    body: EntryFieldTypes.Text;
    richBody?: EntryFieldTypes.RichText;
    author?: EntryFieldTypes.EntryLink<TypePersonSkeleton>;
    publishDate: EntryFieldTypes.Date;
    tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"general" | "javascript" | "static-sites">>;
}

export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields, "blogPost">;
export type TypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;

export function isTypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeBlogPost<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'blogPost'
}
