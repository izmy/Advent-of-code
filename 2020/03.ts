import { getPuzzleInputApi, getPuzzleInputFile } from "..";

const ski = (right: number, down: number, input: string[]) => {
  let trees = 0;
  let position = 0;
  const offset = right;

  for (let i = 0; i < input.length; i += down) {
    const field = input[i][position % input[i].length];
    field === "#" ? trees++ : trees;
    position = (position + offset) % input[i].length;
  }

  return trees;
};

const day3 = (input: string[]) => {
  const slopes = [
    ski(1, 1, input),
    ski(3, 1, input),
    ski(5, 1, input),
    ski(7, 1, input),
    ski(1, 2, input),
  ];

  return {
    part1: slopes[1],
    part2: slopes.reduce((acc, currVal) => acc * currVal, 1),
  };
};

const testInput = getPuzzleInputFile("03");
console.log(day3(testInput));

getPuzzleInputApi(3).then((input) => {
  console.log(day3(input));
});
