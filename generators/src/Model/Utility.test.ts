import { randInt, randomChoice, randomExpDecayChoice } from "./Utility";

test('randomChoice returns elements according to deterministic weights', () => {
    const items: Array<'a' | 'b' | 'c'> = ['a', 'b', 'c'];
    const weights = [0, 0, 1];
    const counts = { a: 0, b: 0, c: 0 };

    // Run many trials to confirm behavior
    for (let i = 0; i < 1000; i++) {
        const result = randomChoice(items, weights);
        counts[result]++;
    }

    expect(counts.a).toBe(0);
    expect(counts.b).toBe(0);
    expect(counts.c).toBeGreaterThanOrEqual(1000);
});

test('randomChoice returns elements according to random weights', () => {
    const items: Array<'a' | 'b' | 'c'> = ['a', 'b', 'c'];
    const weights = [0, .2, .8];
    const counts = { a: 0, b: 0, c: 0 };

    // Run many trials to confirm behavior
    for (let i = 0; i < 1000; i++) {
        const result = randomChoice(items, weights);
        counts[result]++;
    }

    expect(counts.a).toBe(0);
    expect(counts.b).toBeGreaterThan(150); // Some give for randomness
    expect(counts.c).toBeGreaterThanOrEqual(750); // Some give for randomness
});

test('randomChoice with equal weights gives roughly equal frequencies', () => {
    const items: Array<'x' | 'y' | 'z'> = ['x', 'y', 'z'];
    const weights = [1, 1, 1];
    const counts = { x: 0, y: 0, z: 0 };

    for (let i = 0; i < 3000; i++) {
        const result = randomChoice(items, weights);
        counts[result]++;
    }

    const values = Object.values(counts);
    for (let count of values) {
        expect(count).toBeGreaterThan(800);
        expect(count).toBeLessThan(1200);
    }
});

test('randomChoice throws on mismatched input lengths', () => {
    expect(() => randomChoice([1, 2], [1])).toThrow();
});

test('randomExpDecayChoice prefers earlier elements', () => {
    const arr = ['first', 'second', 'third', 'fourth'];
    const counts: Record<string, number> = {
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
    };

    for (let i = 0; i < 10000; i++) {
        const choice = randomExpDecayChoice(arr);
        counts[choice]++;
    }

    // Expect decreasing frequency
    expect(counts.first).toBeGreaterThan(counts.second);
    expect(counts.second).toBeGreaterThan(counts.third);
    expect(counts.third).toBeGreaterThan(counts.fourth);
});

test('randomExpDecayChoice works on empty array', () => {
    expect(() => randomExpDecayChoice([])).toThrow();
});

test('randomChoice with all zero weights throws', () => {
    const items = [1, 2, 3];
    const weights = [0, 0, 0];
    expect(() => randomChoice(items, weights)).toThrow();
});

test('randomChoice uses uniform weights if none provided', () => {
  const arr = ['a', 'b', 'c', 'd'];
  const counts: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };

  for (let i = 0; i < 4000; i++) {
    const result = randomChoice(arr);
    counts[result]++;
  }

  for (let count of Object.values(counts)) {
    expect(count).toBeGreaterThan(800);
    expect(count).toBeLessThan(1200); // Rough uniform range
  }
});

test('randomExpDecayChoice can choose last element', () => {
    const arr = ['first', 'second', 'third'];
    const counts: Record<string, number> = {
        first: 0,
        second: 0,
        third: 0,
    };

    for (let i = 0; i < 10000; i++) {
        const choice = randomExpDecayChoice(arr);
        counts[choice]++;
    }

    // Expect decreasing frequency
    expect(counts.first).toBeGreaterThan(counts.second);
    expect(counts.second).toBeGreaterThan(counts.third);
    expect(counts.third).toBeGreaterThan(0);
})

test('randInt', () => {
    const results = [0,0,0,0,0,0 /*5*/ ,0 /*6*/,0 /*7*/]; // 8 is implicitly tested because no array index error.
    for (let i = 0; i < 10000; i++) {
        const result: number = randInt({minInclusive: 5, maxExclusive: 8})
        results[result] += 1
    }

    for (let i = 5; i < 8; i++) {
        expect(results[i]).toBeGreaterThan(2800);
        expect(results[i]).toBeLessThan(4000);
    }
});

