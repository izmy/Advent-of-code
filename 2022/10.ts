import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const generateImage = (sprite: string[][]) => {
  return sprite.map(s => s.join("")).join("\n");
};

const day10 = (input: string[]) => {
  let xRegister = 1;
  let totalCycle = 1;
  let signalStrength = 0;
  let sprite = [0, 1, 2];
  const image = Array.from(Array(6), _ => Array(40).fill("."));

  for (const line of input) {
    const [instruction, rawValue] = line.split(" ");
    const value = instruction === "addx" ? parseInt(rawValue) : 0;
    const cycles = instruction === "addx" ? 2 : 1;

    for (let i = 0; i < cycles; i++) {
      const row = Math.floor((totalCycle - 1) / 40);
      const point = (totalCycle - 1) % 40;

      if (sprite.includes(point)) {
        image[row][point] = "#";
      }

      for (let j = 20; j <= totalCycle; j += 40) {
        if (totalCycle / j === 1) {
          signalStrength += totalCycle * xRegister;
        }
      }
      totalCycle++;
    }

    xRegister += value;
    sprite = [xRegister - 1, xRegister, xRegister + 1];
  }

  console.log(generateImage(image));

  return {
    part1: signalStrength,
    part2: generateImage(image),
  };
};

const testInput = getPuzzleInputFile("10", 2022);
console.log(day10(testInput));

getPuzzleInputApi(10, 2022).then(input => {
  console.log(day10(input));
});
