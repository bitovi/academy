/**
 * Exercise 1
 *
 * Update the `Keys` type to act as a type alias for `keyof`. With this type,
 * we don't want to allow `string`s, `number`s and `boolean`s to be passed
 * into the `Keys` type  (`Keys<string>`, `Keys<number>`, etc. should not be allowed). So that given
 * the following types...
 *
 * ```ts
 * type LeafStarterPokemon = {
 *  bulbasaur: PokedexEntry;
 *  ivysaur: PokedexEntry;
 *  venusauar: PokedexEntry;
 * };
 * ```
 *
 * `Keys<LeafStarters>` is `'bulbasaur' | 'ivysaur' | 'venusauar'` and
 *
 * ```ts
 * type FireStarterPokemon = {
 *  charmander: PokedexEntry;
 *  charmeleon: PokedexEntry;
 *  charizard: PokedexEntry;
 * };
 * ```
 *
 * `Keys<FireStarterPokemon>` is `'charmander' | 'charmeleon' | 'charizard'`.
 *
 * Hint: `keyof` should mainly be used on `object`s is there a way we can incorporate that into the type.
 *
 * > Be sure to check your answers to `1a` **Before** continuing on to Exercise 1b
 */

export type Keys<T> = any;
