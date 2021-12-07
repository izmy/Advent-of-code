import { getPuzzleInputApi, getPuzzleInputFile } from "..";

const existSum = (listOfNumbers: number[], summedNumber: number) => {
  for (let i = 0; i < listOfNumbers.length; i++) {
    for (let j = i; j < listOfNumbers.length; j++) {
      const numberA = listOfNumbers[i];
      const numberB = listOfNumbers[j];
      if (numberA !== numberB && numberA + numberB === summedNumber) {
        return true;
      }
    }
  }

  return false;
};

const findEncryptionWeakness = (listOfNumbers: number[], invalidNumber: number) => {
  let find = false;
  let encryptionWeakness = 0;

  for (let i = 0; i < listOfNumbers.length; i++) {
    let sum = 0;
    let contiguousSetOfNumbers = [];
    for (let j = i; j < listOfNumbers.length; j++) {
      sum += listOfNumbers[j];
      contiguousSetOfNumbers = [...contiguousSetOfNumbers, listOfNumbers[j]];

      if (sum === invalidNumber) {
        find = true;
        break;
      }
    }
    if (find) {
      const sortedContiguousSetOfNumbers = contiguousSetOfNumbers.sort();
      encryptionWeakness =
        sortedContiguousSetOfNumbers[0] +
        sortedContiguousSetOfNumbers[sortedContiguousSetOfNumbers.length - 1];
      break;
    }
  }

  return encryptionWeakness;
};

const day9 = (input: string[], preambuleLength) => {
  const preambuleIndex = {
    start: 0,
    end: preambuleLength,
  };

  let valid = false;
  let invalidNumber: number;
  let encryptionWeakness: number;

  for (const [index, number] of Object.entries(input)) {
    if (Number(index) < preambuleLength) continue;

    const preambule = input.slice(preambuleIndex.start, preambuleIndex.end).map(Number);
    valid = existSum(preambule, Number(number));
    if (!valid) {
      invalidNumber = Number(number);
      encryptionWeakness = findEncryptionWeakness(input.map(Number), invalidNumber);
      break;
    }

    preambuleIndex.start++;
    preambuleIndex.end++;
  }

  return {
    part1: invalidNumber,
    part2: encryptionWeakness,
  };
};

(async () => {
  const testInput = getPuzzleInputFile("09");
  console.log(day9(testInput, 5));

  const input = await await getPuzzleInputApi(9);
  console.log(day9(input, 25));
})();
