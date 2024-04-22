export function dnaCost(baseCost: number, ...sequences: string[]) {
  let sum = baseCost;
  sequences.forEach(sequence => sum += sequence.length);
  return sum
}