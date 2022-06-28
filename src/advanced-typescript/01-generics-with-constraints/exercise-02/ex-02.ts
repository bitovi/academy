import type { Keys } from "../exercise-01/ex-01";

/* Exercise 2
 *
 * Now that we have a `Keys` type let's put it to work. Below is a function called `getStarterPokemonInfomation` that
 * takes two generics. We would like to be able to pass in any of our three starters objects and a starter's name to get the
 * data for that pokemon. Update the types in the function to acheive this.
 *
 * ```ts
 * type FireStarterPokemon = {
 *  charmander: PokedexEntry;
 *  charmeleon: PokedexEntry;
 *  charizard: PokedexEntry;
 * };
 *
 * const fireStarters: FireStarterPokemon = {
 *  charmander: 'From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out',
 *  charmeleon: 'Charmeleon, the Flame Pokémon and the evolved form of Charmander. Charmeleon knocks down opponents with its tail, then defeats them using razor-sharp claws.',
 *  charizard: 'Its wings can carry this POKéMON close to an altitude of 4,600 feet. It blows out fire at very high temperatures.',
 * }
 *
 * const entry = getgetStarterPokemonInfomation(fireStarters, 'charizard')
 * console.log(entry) // 'Its wings can carry this POKéMON close to an altitude of 4,600 feet. It blows out fire at very high temperatures.'
 * ```
 *
 * Hint: our `Keys` type has a constraint to be satisfied, we need to make sure anything passed into `Keys` satisfies those constraints as well...
 */
export function getStarterPokemonInfomation<Starters, Name>(
  starter: Starters,
  name: Name
) {
  return starter[name];
}
