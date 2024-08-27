export function dnaCost(baseCost: number, ...sequences: string[]) {
  let sum = baseCost;
  sequences.forEach(sequence => {
    return sum += sequence.length;
  });
  return sum;
}