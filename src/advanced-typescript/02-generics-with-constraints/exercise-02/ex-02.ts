type Keys<T extends object> = keyof T;

/* Exercise 2
 *
 * Now that we have a `Keys` type let's put it to work. Below is a function called `getStarterPokemonInfomation` that
 * takes two generics. We would like to be able to pass in any of our three starters objects and a starter’s name to get the
 * data for that pokemon. Update the generics definition in the function to allow for this to happen.
 *
 * > **Before you Start**
 * > Don’t worry about adding a return type to the function, focus only on the definition of the generics
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
 * const entry = getStarterPokemonInfomation(fireStarters, 'charizard')
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
