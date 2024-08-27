export function dnaCost(baseCost: number, ...sequences: string[]) {
  return sequences.reduce((sum, sequence) => {
    return sum + sequence.length;
  }, baseCost);
}
