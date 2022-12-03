import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const day3 = (input: string[]) => {
  const lines = input.length;
  const bitSize = input[0].length;
  let sum = Array(bitSize).fill(0);
  let gamma = [];
  let epsilon = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < bitSize; j++) {
      sum[j] += Number(input[i][j]);
    }
  }

  for (let i = 0; i < sum.length; i++) {
    if (sum[i] < lines / 2) {
      gamma[i] = 0;
      epsilon[i] = 1;
    } else {
      gamma[i] = 1;
      epsilon[i] = 0;
    }
  }

  const gammaDec = parseInt(gamma.join(""), 2);
  const epsilonDec = parseInt(epsilon.join(""), 2);

  let oxygenGenerator = input;
  let co2ScrubberRating = input;
  sum = Array(bitSize).fill(0);

  for (let i = 0; i < bitSize; i++) {
    for (let j = 0; j < oxygenGenerator.length; j++) {
      sum[i] += Number(oxygenGenerator[j][i]);
    }

    let newOxygenGenerator = [];
    let moreZeros = sum[i] < oxygenGenerator.length / 2;
    for (let j = 0; j < oxygenGenerator.length; j++) {
      if (moreZeros) {
        if (Number(oxygenGenerator[j][i]) === 0) {
          newOxygenGenerator.push(oxygenGenerator[j]);
        }
      } else {
        if (Number(oxygenGenerator[j][i]) === 1) {
          newOxygenGenerator.push(oxygenGenerator[j]);
        }
      }
    }
    oxygenGenerator = newOxygenGenerator;
    if (oxygenGenerator.length === 1) break;
  }

  sum = Array(bitSize).fill(0);

  for (let i = 0; i < bitSize; i++) {
    for (let j = 0; j < co2ScrubberRating.length; j++) {
      sum[i] += Number(co2ScrubberRating[j][i]);
    }

    let newCo2ScrubberRating = [];
    let moreZeros = sum[i] < co2ScrubberRating.length / 2;

    for (let j = 0; j < co2ScrubberRating.length; j++) {
      if (moreZeros) {
        if (Number(co2ScrubberRating[j][i]) === 1) {
          newCo2ScrubberRating.push(co2ScrubberRating[j]);
        }
      } else {
        if (Number(co2ScrubberRating[j][i]) === 0) {
          newCo2ScrubberRating.push(co2ScrubberRating[j]);
        }
      }
    }
    co2ScrubberRating = newCo2ScrubberRating;
    if (co2ScrubberRating.length === 1) break;
  }

  const oxygenGeneratorDec = parseInt(oxygenGenerator.join(""), 2);
  const co2ScrubberRatingDec = parseInt(co2ScrubberRating.join(""), 2);

  return {
    part1: gammaDec * epsilonDec,
    part2: oxygenGeneratorDec * co2ScrubberRatingDec,
  };
};

const testInput = getPuzzleInputFile("03", 2021);
console.log(day3(testInput));

getPuzzleInputApi(3, 2021).then(input => {
  console.log(day3(input));
});
