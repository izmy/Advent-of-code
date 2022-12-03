import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const day1 = (input: string[]) => {
  const result1 = input
    .join("\n")
    .split("\n\n")
    .map(x =>
      x
        .split("\n")
        .map(Number)
        .reduce((acc, curr) => acc + curr, 0)
    )
    .sort((a, b) => a - b)
    .slice(-1)[0];

  const result2 = input
    .join("\n")
    .split("\n\n")
    .map(x =>
      x
        .split("\n")
        .map(Number)
        .reduce((acc, curr) => acc + curr, 0)
    )
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((acc, curr) => acc + curr);

  return {
    part1: result1,
    part2: result2,
  };
};

const testInput = getPuzzleInputFile("01", 2022);
console.log(day1(testInput));

getPuzzleInputApi(1, 2022).then(input => {
  console.log(day1(input));
});
