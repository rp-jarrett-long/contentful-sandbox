import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypePersonFields {
    name: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    company: EntryFieldTypes.Symbol;
    shortBio: EntryFieldTypes.Text;
    email?: EntryFieldTypes.Symbol;
    phone?: EntryFieldTypes.Symbol;
    facebook?: EntryFieldTypes.Symbol;
    twitter?: EntryFieldTypes.Symbol;
    github?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
}

export type TypePersonSkeleton = EntrySkeletonType<TypePersonFields, "person">;
export type TypePerson<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePersonSkeleton, Modifiers, Locales>;

export function isTypePerson<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePerson<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'person'
}
