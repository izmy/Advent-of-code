import { getPuzzleInputApi, getPuzzleInputFile } from "..";

const day2 = (input: string[]) => {
  let validPasswordA = 0;
  let validPasswordB = 0;

  for (const line of input) {
    const [rule, char, password] = line.split(" ");
    const [minLength, maxLength] = rule.split("-").map(Number);
    const validLetter = char[0];

    const sumOfLetter = Array.from(password).reduce((accumulator, currentValue) => currentValue === validLetter ? ++accumulator : accumulator, 0)

    if (minLength <= sumOfLetter && sumOfLetter <= maxLength) {
      validPasswordA++;
    }

    if (
      password[minLength - 1] === validLetter && password[maxLength - 1] !== validLetter ||
      password[maxLength - 1] === validLetter && password[minLength - 1] !== validLetter
    ) {
      validPasswordB++;
    }
  }

  return {
    validPasswordA,
    validPasswordB
  };
}

const testInput = getPuzzleInputFile("02");
console.log(day2(testInput));

getPuzzleInputApi(2).then(input => {
  console.log(day2(input))
});
