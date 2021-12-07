import { getPuzzleInputApi, getPuzzleInputFile } from "..";

const day6 = (input: string[]) => {
  let answers = [];
  let answersSum = 0;

  let sameAnswersCount = 0;
  let sameAnswersSum = 0;

  for (const line of input) {
    if (line === "") {
      answersSum += new Set(answers).size;

      const uniqueAnswers = answers.reduce((acc, curr) => {
        if (typeof acc[curr] === "undefined") {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      }, {}) as { [key: string]: number };

      for (const property in uniqueAnswers) {
        if (uniqueAnswers[property] === sameAnswersCount) {
          sameAnswersSum++;
        }
      }

      answers = [];
      sameAnswersCount = 0;
    } else {
      Array.from(line).forEach(char => {
        answers = [...answers, char];
      });
      sameAnswersCount++;
    }
  }
  return {
    part1: answersSum,
    part2: sameAnswersSum,
  };
};

(async () => {
  const testInput = getPuzzleInputFile("06");
  console.log(day6(testInput));

  const input = await await getPuzzleInputApi(6);
  console.log(day6(input));
})();
