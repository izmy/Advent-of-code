import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const day2 = (input: string[]) => {
  const result1 = input
    .map(value => {
      switch (value) {
        case "A X": // rock/rock
          return 1 + 3;
        case "A Y": // rock/paper
          return 2 + 6;
        case "A Z": // rock/scissor
          return 3 + 0;
        case "B X": // paper/rock
          return 1 + 0;
        case "B Y": // paper/paper
          return 2 + 3;
        case "B Z": // paper/scissor
          return 3 + 6;
        case "C X": // scissor/rock
          return 1 + 6;
        case "C Y": // scissor/paper
          return 2 + 0;
        case "C Z": // scissor/scissor
          return 3 + 3;
        default:
          return 0;
      }
    })
    .reduce((acc, curr) => acc + curr, 0);

  const result2 = input
    .map(value => {
      switch (value) {
        case "A X": // rock/lose => scissor
          return 3 + 0;
        case "A Y": // rock/draw => rock
          return 1 + 3;
        case "A Z": // rock/win => paper
          return 2 + 6;
        case "B X": // paper/lose => rock
          return 1 + 0;
        case "B Y": // paper/draw => paper
          return 2 + 3;
        case "B Z": // paper/win => scissor
          return 3 + 6;
        case "C X": // scissor/lose => paper
          return 2 + 0;
        case "C Y": // scissor/draw => scissor
          return 3 + 3;
        case "C Z": // scissor/win => rock
          return 1 + 6;
        default:
          return 0;
      }
    })
    .reduce((acc, curr) => acc + curr, 0);

  return {
    part1: result1,
    part2: result2,
  };
};

const testInput = getPuzzleInputFile("02", 2022);
console.log(day2(testInput));

getPuzzleInputApi(2, 2022).then(input => {
  console.log(day2(input));
});
