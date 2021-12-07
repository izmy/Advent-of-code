import { getPuzzleInputApi, getPuzzleInputFile } from "..";

const findAllCombinations = (adapters, charginOutlet, done) => {
  if (adapters.length <= 2) {
    return done;
  }

  return (
    findAllCombinations(adapters.slice(1), charginOutlet + 1, done + 3) +
    findAllCombinations(adapters.slice(1), charginOutlet + 2, done + 3) +
    findAllCombinations(adapters.slice(1), charginOutlet + 3, done + 3)
  );
};

const day10 = (input: string[]) => {
  const adapters = input.map(Number).sort((a, b) => a - b);
  let chargingOutlet = 0;
  let increment = {
    1: 0,
    3: 0,
  };

  console.log(adapters);

  for (const adapterValue of adapters) {
    const diff = adapterValue - chargingOutlet;
    console.log(diff);
    if (diff === 1) {
      increment[1]++;
    }

    if (diff === 3) {
      increment[3]++;
    }
    chargingOutlet = adapterValue;
  }

  chargingOutlet += 3;
  increment[3]++;

  const allCombinations = findAllCombinations(adapters, 0, 0);
  console.log(allCombinations);

  return {
    part1: increment[1] * increment[3],
    part2: allCombinations,
  };
};

(async () => {
  const testInput = getPuzzleInputFile("10");
  console.log(day10(testInput));

  // const input = await await getPuzzleInputApi(10);
  // console.log(day10(input));
})();
