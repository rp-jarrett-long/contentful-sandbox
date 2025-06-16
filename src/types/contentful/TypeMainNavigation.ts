import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeMainNavigationSectionSkeleton } from "./TypeMainNavigationSection";

export interface TypeMainNavigationFields {
    internalTitle: EntryFieldTypes.Symbol;
    logo: EntryFieldTypes.AssetLink;
    sections?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeMainNavigationSectionSkeleton>>;
}

export type TypeMainNavigationSkeleton = EntrySkeletonType<TypeMainNavigationFields, "mainNavigation">;
export type TypeMainNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMainNavigationSkeleton, Modifiers, Locales>;

export function isTypeMainNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeMainNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'mainNavigation'
}
