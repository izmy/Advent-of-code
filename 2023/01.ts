import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const writtenNumbers = [
  { text: "one", value: 1 },
  { text: "two", value: 2 },
  { text: "three", value: 3 },
  { text: "four", value: 4 },
  { text: "five", value: 5 },
  { text: "six", value: 6 },
  { text: "seven", value: 7 },
  { text: "eight", value: 8 },
  { text: "nine", value: 9 },
];

const getWrittenNumbers = (line: string) => {
  const foundWrittenNumbers: any = [];

  writtenNumbers.forEach(writtenNumber => {
    let index = line.indexOf(writtenNumber.text);
    while (index !== -1) {
      foundWrittenNumbers.push({
        writtenNumber: writtenNumber.text,
        index,
        value: writtenNumber.value,
      });
      index = line.indexOf(writtenNumber.text, index + 1);
    }
  });

  
  foundWrittenNumbers.sort((a, b) => a.index - b.index);

  return foundWrittenNumbers;
};

const day1 = (input: string[]) => {
  let firstNumber = { value: null, index: null } as any;
  let lastNumber = { value: null, index: null } as any;
  let result1 = 0;
  let result2 = 0;

  for (const line of input) {
    for (let i = 0; i < line.length; i++) {
      const startIndex = i;
      const endIndex = line.length - 1 - i;

      if (firstNumber.value === null) {
        if (!isNaN(Number(line[i]))) {
          firstNumber = { value: parseInt(line[startIndex]), index: startIndex };
        }
      }

      if (lastNumber.value === null) {
        if (!isNaN(Number(line[endIndex]))) {
          lastNumber = { value: parseInt(line[endIndex]), index: endIndex };
        }
      }

      if (firstNumber.value != null && lastNumber.value != null) {
        break;
      }
    }
    
    result1 += Number([firstNumber.value, lastNumber.value].join(""));

    const foundWrittenNumbers = getWrittenNumbers(line);
    
    if (foundWrittenNumbers.length >= 2) {
      if (foundWrittenNumbers[0].index <= firstNumber.index) {
        firstNumber = {value: foundWrittenNumbers[0].value, index: foundWrittenNumbers[0].index};
      }
      if (foundWrittenNumbers[foundWrittenNumbers.length - 1].index >= lastNumber.index) {
        lastNumber = { value: foundWrittenNumbers[foundWrittenNumbers.length - 1].value, index: foundWrittenNumbers[foundWrittenNumbers.length - 1].index };
      }
    }

    if (foundWrittenNumbers.length === 1) {
      if (foundWrittenNumbers[0].index <= firstNumber.index) {
        firstNumber = {value: foundWrittenNumbers[0].value, index: foundWrittenNumbers[0].index};
      }
      if (foundWrittenNumbers[0].index >= lastNumber.index) {
        lastNumber = { value: foundWrittenNumbers[0].value, index: foundWrittenNumbers[0].index };
      }
    }

    result2 += Number([firstNumber.value, lastNumber.value].join(""));
    firstNumber = { value: null, index: null };
    lastNumber = { value: null, index: null };
  }

  return {
    part1: result1,
    part2: result2,
  };
};

const testInput = getPuzzleInputFile("01", 2023);
console.log(day1(testInput));

getPuzzleInputApi(1, 2023).then(input => {
  console.log(day1(input));
});
