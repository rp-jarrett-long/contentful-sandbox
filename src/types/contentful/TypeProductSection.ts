import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeProductSkeleton } from "./TypeProduct";

export interface TypeProductSectionFields {
    internalName?: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    products?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProductSkeleton>>;
}

export type TypeProductSectionSkeleton = EntrySkeletonType<TypeProductSectionFields, "productSection">;
export type TypeProductSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProductSectionSkeleton, Modifiers, Locales>;

export function isTypeProductSection<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeProductSection<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'productSection'
}
