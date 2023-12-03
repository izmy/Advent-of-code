import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const GEAR_SYMBOL = "*";

interface EngineNumber {
  value: number;
  indexI: number[];
  indexJ: number[];
}

interface GearNumber {
  i: number;
  j: number;
}

const isNumber = (value: string) => {
  return !Number.isNaN(parseInt(value));
};

const isSymbol = (char: string) => {
  const isDot = char === ".";
  const isSymbol =
    !isDot &&
    ((char.charCodeAt(0) >= 33 && char.charCodeAt(0) <= 47) ||
      (char.charCodeAt(0) >= 58 && char.charCodeAt(0) <= 64) ||
      (char.charCodeAt(0) >= 91 && char.charCodeAt(0) <= 96));

  return isSymbol;
};

const isNeighbourSymbol = (i: number, j: number, input: string[][]) => {
  for (let k = -1; k <= 1; k++) {
    for (let l = -1; l <= 1; l++) {
      if (
        (i + k !== 0 || j + l !== 0) &&
        i + k >= 0 &&
        j + l >= 0 &&
        i + k < input.length &&
        j + l < input.length
      ) {
        if (isSymbol(input[i + k][j + l])) {
          return true;
        }
      }
    }
  }
  return false;
};

const isNeighbourGear = (i: number, j: number, input: string[][]) => {
  const allNumbers = [] as any[];
  for (let k = -1; k <= 1; k++) {
    for (let l = -1; l <= 1; l++) {
      if (
        (i + k !== 0 || j + l !== 0) &&
        i + k >= 0 &&
        j + l >= 0 &&
        i + k < input.length &&
        j + l < input.length
      ) {
        if (isNumber(input[i + k][j + l])) {
          allNumbers.push({ i: i + k, j: j + l });
        }
      }
    }
  }

  return allNumbers;
};

const day3 = (input: string[]) => {
  const size = input.length;
  const engine: string[][] = [];
  const engineNumbers: EngineNumber[] = [];
  const gears: GearNumber[] = [];

  for (let i = 0; i < size; i++) {
    let parsedNumber: string[] = [];
    let indexJ: number[] = [];
    engine[i] = [];
    for (let j = 0; j < size; j++) {
      if (isNumber(input[i][j])) {
        parsedNumber.push(input[i][j]);
        indexJ.push(j);
      }
      if (parsedNumber.length !== 0 && !isNumber(input[i][j + 1])) {
        const engineNumber = {
          value: +parsedNumber.join(""),
          indexI: [i],
          indexJ,
        };
        engineNumbers.push(engineNumber);
        parsedNumber = [];
        indexJ = [];
      }
      engine[i][j] = input[i][j];

      if (input[i][j] === "*") {
        gears.push({ i, j });
      }
    }
  }

  //part1
  const correctEngineNumbers: number[] = [];
  for (const engineNumber of engineNumbers) {
    for (const indexJ of engineNumber.indexJ) {
      if (isNeighbourSymbol(engineNumber.indexI[0], indexJ, engine)) {
        correctEngineNumbers.push(engineNumber.value);
        break;
      }
    }
  }
  const result1 = correctEngineNumbers.reduce((acc, curr) => acc + curr, 0);

  //part2
  let gearRatio = 0;
  for (const gear of gears) {
    const gearConnections = isNeighbourGear(gear.i, gear.j, engine);

    if (gearConnections.length >= 2) {
      console.log(gearConnections)
      const realGear = new Set<any>()
      for (const gearConnection of gearConnections) {
        const match = engineNumbers.find(engineNumber => {
          if (engineNumber.indexI.includes(gearConnection.i) && engineNumber.indexJ.includes(gearConnection.j)) {
            return true;
          }
        });
        if (match != null){
          realGear.add(match)
        }
      }
      if (realGear.size === 2) {
        gearRatio += Array.from(realGear).reduce((acc, curr) => acc * curr.value, 1);
      }
    }
  }

  const result2 = gearRatio;

  return {
    part1: result1,
    part2: result2,
  };
};

const testInput = getPuzzleInputFile("03", 2023);
console.log(day3(testInput));

getPuzzleInputApi(3, 2023).then(input => {
  console.log(day3(input));
});
