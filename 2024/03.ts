import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const MUL_PATTERN_REGEX = /mul\(\d+,\d+\)/g;
const DO_PATTERN_REGEX = /do\(\)/g;
const DONT_PATTERN_REGEX = /don't\(\)/g;

const day3 = (input: string[]) => {
  let sum1 = 0;

  // part1
  for (const line of input) {
    const mulData = [...line.matchAll(MUL_PATTERN_REGEX)];

    const numbers = mulData.map(d => {
      const [a, b] = d[0].replace("mul(", "").replace(")", "").split(",").map(Number);

      return a * b;
    });

    sum1 += numbers.reduce((acc, curr) => acc + curr, 0);
  }

  let endWithDo = true;
  let sum2 = 0;
  // part2
  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    const mulData = [...line.matchAll(MUL_PATTERN_REGEX)];
    const doData = [...line.matchAll(DO_PATTERN_REGEX)];
    const dontData = [...line.matchAll(DONT_PATTERN_REGEX)];

    const doIndexes = doData.map(d => d.index);
    const dontIndexes = dontData.map(d => d.index);

    const allowedIndexRanges = [];

    if (endWithDo) {
      doIndexes.unshift(0);
      endWithDo = false;
    }

    const doIndexesCleaned = [];
    const dontIndexesCleaned = [];
    while (doIndexes.length > 0) {
      const start = doIndexes.shift();
      const lastestDontIndex = dontIndexesCleaned[dontIndexesCleaned.length - 1];

      if (lastestDontIndex !== undefined && start < lastestDontIndex) {
        continue;
      }

      doIndexesCleaned.push(start);

      for (const dontIndex of dontIndexes) {
        if (start < dontIndex) {
          dontIndexesCleaned.push(dontIndex);
          break;
        }
      }
    }

    for (let i = 0; i < doIndexesCleaned.length; i++) {
      if (dontIndexesCleaned[i] === undefined && endWithDo) {
        break;
      }
      if (dontIndexesCleaned[i] === undefined) {
        endWithDo = true;
      }
      allowedIndexRanges.push([
        doIndexesCleaned[i],
        dontIndexesCleaned[i] || line.length,
      ]);
    }

    const numbers = allowedIndexRanges.map(([start, end]) =>
      mulData
        .filter(d => d.index >= start && d.index <= end)
        .map(d => {
          const [a, b] = d[0].replace("mul(", "").replace(")", "").split(",").map(Number);

          return a * b;
        })
        .reduce((acc, curr) => acc + curr, 0)
    );

    sum2 += numbers.reduce((acc, curr) => acc + curr, 0);
  }

  return {
    part1: sum1,
    part2: sum2,
  };
};

const testInput = getPuzzleInputFile("03", 2024);
console.log(day3(testInput));

getPuzzleInputApi(3, 2024).then(input => {
  console.log(day3(input));
});
