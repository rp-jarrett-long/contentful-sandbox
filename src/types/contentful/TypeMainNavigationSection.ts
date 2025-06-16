import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypePageSkeleton } from "./TypePage";

export interface TypeMainNavigationSectionFields {
    title: EntryFieldTypes.Symbol;
    pages?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypePageSkeleton>>;
}

export type TypeMainNavigationSectionSkeleton = EntrySkeletonType<TypeMainNavigationSectionFields, "mainNavigationSection">;
export type TypeMainNavigationSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMainNavigationSectionSkeleton, Modifiers, Locales>;

export function isTypeMainNavigationSection<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeMainNavigationSection<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'mainNavigationSection'
}
