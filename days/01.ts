import { getPuzzleInputApi, getPuzzleInputFile } from "..";


const day1 = (input: string[]) => {
  const values = input.map(Number);

  for (const i in values) {
    for (const j in values) {
      const sum = values[i] + values[j];
      if (sum === 2020) {
        return values[i] * values[j];
      }
    }
  }
}

const testInput = getPuzzleInputFile("01");
console.log(day1(testInput));

getPuzzleInputApi(1).then(input => {
  console.log(day1(input))
});
