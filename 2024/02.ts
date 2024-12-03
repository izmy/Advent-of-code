import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const isSafe = (levels: number[]) => {
  for (let i = 0; i < levels.length; i++) {
    if (i === levels.length - 1) {
      return true;
    }

    if (levels[i] >= levels[i + 1]) {
      return false;
    }

    if (levels[i + 1] - levels[i] > 3) {
      return false;
    }
  }

  return true;
};

const day2 = (input: string[]) => {
  let safe = 0;
  let safe2 = 0;

  for (const line of input) {
    let levels = line.split(" ").map(Number);

    if (levels[0] > levels[levels.length - 1]) {
      levels = levels.reverse();
    }

    // part1
    if (isSafe(levels)) {
      safe++;
    }

    // part2
    if (isSafe(levels)) {
      safe2++;
    } else {
      for (let i = 0; i < levels.length; i++) {
        const fixedLevels = [...levels];
        fixedLevels.splice(i, 1);

        if (isSafe(fixedLevels)) {
          safe2++;
          break;
        }
      }
    }
  }

  return {
    part1: safe,
    part2: safe2,
  };
};

const testInput = getPuzzleInputFile("02", 2024);
console.log(day2(testInput));

getPuzzleInputApi(2, 2024).then(input => {
  console.log(day2(input));
});
