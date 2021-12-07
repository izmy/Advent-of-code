import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const day2 = (input: string[]) => {
  let horizontalA = 0;
  let depthA = 0;

  // part 1
  for (const line of input) {
    const [command, value] = line.split(" ");
    if (command === "forward") {
      horizontalA += Number(value);
    }

    if (command === "down") {
      depthA += Number(value);
    }

    if (command === "up") {
      depthA -= Number(value);
    }
  }

  let horizontalB = 0;
  let depthB = 0;
  let aim = 0;
  // part 2
  for (const line of input) {
    const [command, value] = line.split(" ");
    if (command === "forward") {
      horizontalB += Number(value);
      depthB += aim * Number(value);
    }

    if (command === "down") {
      aim += Number(value);
    }

    if (command === "up") {
      aim -= Number(value);
    }
  }

  return {
    part1: horizontalA * depthA,
    part2: horizontalB * depthB,
  };
};

const testInput = getPuzzleInputFile("02", 2021);
console.log(day2(testInput));

getPuzzleInputApi(2, 2021).then(input => {
  console.log(day2(input));
});
