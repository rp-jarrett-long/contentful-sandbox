/**
 * Extracts the keys from type `T` whose values are assignable to type `U`.
 *
 * @typeParam T - The object type to extract keys from.
 * @typeParam U - The value type to match against.
 *
 * @example
 * type Example = {
 *   id: number;
 *   name: string;
 *   active: boolean;
 * };
 *
 * // Only the keys with string values will be extracted.
 * type StringKeys = KeysOfType<Example, string>; // "name"
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
