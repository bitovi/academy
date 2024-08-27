export function dnaCost(baseCost, sequence) {
    return baseCost + sequence.length;
}

let raptorCost = dnaCost(5000,"CGGCA");

console.log(raptorCost);
// Logs 5005
