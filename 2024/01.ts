import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const day1 = (input: string[]) => {
  const arrayA: number[] = [];
  const arrayB: number[] = [];
  const distances: number[] = [];
  const scores: number[] = [];

  for (const line of input) {
    const [a, b] = line.trim().replace(/\s\s+/g, " ").split(" ").map(Number);

    arrayA.push(a);
    arrayB.push(b);
  }

  arrayA.sort();
  arrayB.sort();

  for (let i = 0; i < arrayA.length; i++) {
    const distance = Math.abs(arrayA[i] - arrayB[i]);
    distances.push(distance);
  }

  const result1 = distances.reduce((acc, curr) => acc + curr, 0);

  for (let i = 0; i < arrayA.length; i++) {
    const countInB = arrayB.filter(b => b === arrayA[i]).length;
    const score = arrayA[i] * countInB;

    scores.push(score);
  }

  const result2 = scores.reduce((acc, curr) => acc + curr, 0);

  return {
    part1: result1,
    part2: result2,
  };
};

const testInput = getPuzzleInputFile("01", 2024);
console.log(day1(testInput));

getPuzzleInputApi(1, 2024).then(input => {
  console.log(day1(input));
});
