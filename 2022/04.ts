import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const day4 = (input: string[]) => {
  const sections = input.map(value =>
    value
      .split(",")
      .map(section => section.split("-").map(Number))
      .map(range => Array.from(Array(range[1] + 1).keys()).splice(range[0]))
  );

  const part1 = sections.reduce((acc, curr) => {
    const match1 = curr[0].every(item => curr[1].includes(item));
    const match2 = curr[1].every(item => curr[0].includes(item));

    return match1 || match2 ? ++acc : acc;
  }, 0);

  const part2 = sections.reduce((acc, curr) => {
    const match1 = curr[0].some(item => curr[1].includes(item));
    const match2 = curr[1].some(item => curr[0].includes(item));

    return match1 || match2 ? ++acc : acc;
  }, 0);

  return {
    part1,
    part2,
  };
};

const testInput = getPuzzleInputFile("04", 2022);
console.log(day4(testInput));

getPuzzleInputApi(4, 2022).then(input => {
  console.log(day4(input));
});
