export function dnaCost(baseCost:number, ...sequences: string[]) {
  return sequences.reduce(
    (sum, sequence)=> sum + sequence.length,
    baseCost );
}
