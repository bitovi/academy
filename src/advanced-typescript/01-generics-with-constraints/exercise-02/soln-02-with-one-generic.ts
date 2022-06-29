export function getStarterPokemonInfomation<Starters>(
  starter: Starters,
  name: keyof Starters
) {
  return starter[name];
}
