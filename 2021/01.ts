import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const day1 = (input: string[]) => {
  const values = input.map(Number);
  let increaseSumA = 0;

  // part 1
  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[i - 1]) increaseSumA++;
  }

  // part 2
  let increaseSumB = 0;
  let prevSum = null;
  for (let i = 2; i < values.length; i++) {
    let sum = values[i - 2] + values[i - 1] + values[i];
    if (prevSum < sum && prevSum !== null) increaseSumB++;
    prevSum = sum;
  }

  return {
    increaseSumA,
    increaseSumB,
  };
};

const testInput = getPuzzleInputFile("01", 2021);
console.log(day1(testInput));

getPuzzleInputApi(1, 2021).then(input => {
  console.log(day1(input));
});
