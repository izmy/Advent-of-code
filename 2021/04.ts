import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const day4 = (input: string[]) => {
  const bingoNumbers = input[0].split(",").map(Number);
  const bingoTables = [];
  let bingoTablesCount = 0;
  let line = 0;
  bingoTables[bingoTablesCount] = [];

  for (let i = 2; i < input.length; i++) {
    if (input[i] === "") {
      bingoTablesCount++;
      line = 0;
      bingoTables[bingoTablesCount] = [];
    } else {
      bingoTables[bingoTablesCount][line] = input[i]
        .trim()
        .replace(/\s\s+/g, " ")
        .split(" ")
        .map(Number);

      line++;
    }
  }
  bingoTablesCount++;

  let winningTables = [];
  let lastCalledNumber;
  let part1;
  let part2;

  for (let i = 0; i < bingoNumbers.length; i++) {
    if (part1 && part2) break;
    if (winningTables[0] && !part1) {
      let sum = 0;

      for (let i = 0; i < bingoTables[winningTables[0]].length; i++) {
        for (let j = 0; j < bingoTables[winningTables[0]][i].length; j++) {
          if (bingoTables[winningTables[0]][i][j] !== "X") {
            sum += bingoTables[winningTables[0]][i][j];
          }
        }
      }
      part1 = sum * lastCalledNumber;
    }

    if (winningTables.length === bingoTablesCount && !part2) {
      let sum = 0;
      const lastWinningTable = winningTables.length - 1;
      for (let i = 0; i < bingoTables[winningTables[lastWinningTable]].length; i++) {
        for (let j = 0; j < bingoTables[winningTables[lastWinningTable]][i].length; j++) {
          if (bingoTables[winningTables[lastWinningTable]][i][j] !== "X") {
            sum += bingoTables[winningTables[lastWinningTable]][i][j];
          }
        }
      }
      part2 = sum * lastCalledNumber;
      break;
    }

    lastCalledNumber = bingoNumbers[i];
    for (let j = 0; j < bingoTablesCount; j++) {
      for (let k = 0; k < bingoTables[j].length; k++) {
        for (let l = 0; l < bingoTables[j][k].length; l++) {
          if (bingoNumbers[i] === bingoTables[j][k][l]) {
            bingoTables[j][k][l] = "X";
          }
        }
      }

      if (!winningTables.includes(j)) {
        for (let k = 0; k < bingoTables[j].length; k++) {
          let row = 0;
          let column = 0;
          for (let l = 0; l < bingoTables[j][k].length; l++) {
            if (bingoTables[j][k][l] === "X") row++;
            if (bingoTables[j][l][k] === "X") column++;
          }
          if (row === 5 || column === 5) {
            winningTables.push(j);
            break;
          }
        }
      }
    }
  }

  return {
    part1,
    part2,
  };
};

const testInput = getPuzzleInputFile("04", 2021);
console.log(day4(testInput));

getPuzzleInputApi(4, 2021).then(input => {
  console.log(day4(input));
});
