import type { Keys } from "../exercise-01/soln-01";

export function getStarterPokemonInfomation<
  Starters extends object,
  Name extends Keys<Starters>
>(starter: Starters, name: Name): Starters[Name] {
  return starter[name];
}
