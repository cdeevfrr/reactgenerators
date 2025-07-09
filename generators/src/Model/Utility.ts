// Choose one of the members of the array with probabilities given by the `weights`.
// Weights do not need to sum to 1.
export function randomChoice<T>(arr: Array<T>, weights?: Array<number>): T {
  if (!weights) {
    weights = new Array(arr.length).fill(1);
  }

  if (arr.length !== weights.length) {
    throw new Error("Array and weights must be of the same length.");
  }

  const totalWeight = weights.reduce((acc, w) => acc + w, 0);
  const r = Math.random() * totalWeight;

  let cumulative = 0;
  for (let i = 0; i < arr.length; i++) {
    cumulative += weights[i];
    if (r < cumulative) return arr[i];
  }

  // Shouldn't happen unless weights are invalid (e.g., all zeros)
  throw new Error("Invalid weights: check for all zero or negative weights.");
}

// Given an array, choose one of the members of the array with 
// exponentially decreasing probability towards later members of the array.
// Tends to make last member have 1/3 the probability of the first.
export function randomExpDecayChoice<T>(arr: Array<T>): T {
  // Use exponential decay function: weight[i] = exp(-lambda * i)
  // We want to choose lambda so that weights are not too flat or steep
  //
  // This algorithm makes it so the probability distribution is always equal to 
  // the segment of e^(-x) from x=0 to x-1, which means the last member always has about 1/3
  // the probability of the first.
  // 
  const lambda = 1.0 / (arr.length || 1); // Adaptive lambda

  const weights = arr.map((_, i) => Math.exp(-lambda * i));
  return randomChoice(arr, weights);
}

// Uniform distribution.
export function randInt({minInclusive, maxExclusive}:{minInclusive: number, maxExclusive:number}){
    return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive
}
