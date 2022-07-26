/**
 * Exercise 1
 *
 * We used exclude in one of the examples in the content of this section.
 * Let's take a moment to create the type ourselves. Exlude takes two generics
 * `T` and `U` and removes the memebers in `U` from `T`.
 *
 * ```ts
 * type WildPokemonBattle = {
 *   battleType: "wild-pokemon-battle";
 *   challengingPokemon: string;
 * };
 *
 * type WildPokemonBattleNoBattleType = _Exclude<keyof WildPokemonBattle, "battleType">; // "challengingPokemon"
 * ```
 */
type _Exclude<T, U> = any;
