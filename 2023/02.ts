import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const bagLimitation = {
  red: 12,
  green: 13,
  blue: 14,
};

const day2 = (input: string[]) => {
  let gamesSum = 0;
  const incorrectGames = [] as number[];
  const minimumSet = [] as number[];

  for (const line of input) {
    const [gameNo, cubesBlock] = line.slice(5).split(": ");
    gamesSum += parseInt(gameNo);

    const rawCubes = cubesBlock.split("; ");
    const cubesSet = rawCubes.map(rawCube => {
      return rawCube
        .split(", ")
        .map(cube => {
          const [rawQty, color] = cube.split(" ");
          return { [color.replace(",", "")]: parseInt(rawQty) };
        })
        .reduce((acc, curr) => Object.assign(acc, curr), {});
    });

    // part1
    for (const cube of cubesSet) {
      if (incorrectGames.includes(parseInt(gameNo))) break;
      for (const color in cube) {
        if (cube[color] > bagLimitation[color]) {
          incorrectGames.push(parseInt(gameNo));
          break;
        }
      }
    }

    // part2
    const minimumCubesInSet = { blue: null, red: null, green: null };
    for (const cube of cubesSet) {
      for (const color in cube) {
        if (minimumCubesInSet[color] === null || cube[color] > minimumCubesInSet[color]) {
          minimumCubesInSet[color] = cube[color];
        }
      }
    }
    minimumSet.push(
      Object.values(minimumCubesInSet).reduce(
        (acc, curr) => (curr != null ? acc * curr : acc),
        1
      )
    );
  }

  const result1 = gamesSum - incorrectGames.reduce((acc, curr) => acc + curr, 0);
  const result2 = minimumSet.reduce((acc, curr) => acc + curr, 0);

  return {
    part1: result1,
    part2: result2,
  };
};

const testInput = getPuzzleInputFile("02", 2023);
console.log(day2(testInput));

getPuzzleInputApi(2, 2023).then(input => {
  console.log(day2(input));
});
