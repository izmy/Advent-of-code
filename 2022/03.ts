import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const ASCII_OFFSET_LOWER = 96;
const ASCII_OFFSET_UPPER = 38;

const getCharValue = (character?: string) => {
  if (character === undefined) return 0;

  const offset =
    character === character.toLowerCase() ? ASCII_OFFSET_LOWER : ASCII_OFFSET_UPPER;

  return character.charCodeAt(0) - offset;
};

const day3 = (input: string[]) => {
  const sum = input.reduce((acc, curr) => {
    const first = curr.slice(0, curr.length / 2).split("");
    const second = curr.slice(curr.length / 2).split("");
    const character = first.find(item => second.includes(item));

    return acc + getCharValue(character);
  }, 0);

  const groups = input.reduce((acc, curr, index) => {
    const groupIndex = Math.floor(index / 3);
    acc[groupIndex] =
      acc[groupIndex] === undefined
        ? [curr.split("")]
        : [...acc[groupIndex], curr.split("")];

    return acc;
  }, [] as Array<string[][]>);

  const sum2 = groups.reduce((acc, curr) => {
    const character = curr[0].find(
      item => curr[1].includes(item) && curr[2].includes(item)
    );
    return acc + getCharValue(character);
  }, 0);

  return {
    part1: sum,
    part2: sum2,
  };
};

const testInput = getPuzzleInputFile("03", 2022);
console.log(day3(testInput));

getPuzzleInputApi(3, 2022).then(input => {
  console.log(day3(input));
});
