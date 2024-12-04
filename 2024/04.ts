import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

const SEARCH_WORD = "XMAS";

const checkWord = (
  game: string[][],
  word: string,
  i: number,
  j: number,
  di: number,
  dj: number
): boolean => {
  for (let k = 0; k < word.length; k++) {
    if (game[i + k * di]?.[j + k * dj] !== word[k]) {
      return false;
    }
  }
  return true;
};

const checkXWord = (game: string[][], pattern: string, i: number, j: number): boolean => {
  if (
    // top left
    game[i - 1]?.[j - 1] === pattern[0] &&
    // bottom left
    game[i + 1]?.[j - 1] === pattern[1] &&
    // top right
    game[i - 1]?.[j + 1] === pattern[2] &&
    // bottom right
    game[i + 1]?.[j + 1] === pattern[3]
  ) {
    return true;
  }
  return false;
};

const day4 = (input: string[]) => {
  const game: string[][] = [];

  for (let i = 0; i < input.length; i++) {
    game[i] = [];
    for (let j = 0; j < input[i].length; j++) {
      game[i][j] = input[i][j];
    }
  }

  let count1 = 0;

  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game[i].length; j++) {
      if (game[i][j] === SEARCH_WORD[0]) {
        if (checkWord(game, SEARCH_WORD, i, j, 0, 1)) count1++; // horizontal
        if (checkWord(game, SEARCH_WORD, i, j, 0, -1)) count1++; // backwards horizontal
        if (checkWord(game, SEARCH_WORD, i, j, 1, 0)) count1++; // vertical
        if (checkWord(game, SEARCH_WORD, i, j, -1, 0)) count1++; // backwards vertical
        if (checkWord(game, SEARCH_WORD, i, j, 1, 1)) count1++; // left diagonal
        if (checkWord(game, SEARCH_WORD, i, j, -1, 1)) count1++; // left backwards diagonal
        if (checkWord(game, SEARCH_WORD, i, j, 1, -1)) count1++; // right diagonal
        if (checkWord(game, SEARCH_WORD, i, j, -1, -1)) count1++; // right backwards diagonal
      }
    }
  }

  let count2 = 0;

  const combinations = ["MSMS", "MMSS", "SMSM", "SSMM"];

  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game[i].length; j++) {
      if (game[i][j] === "A") {
        for (const pattern of combinations) {
          if (checkXWord(game, pattern, i, j)) count2++;
        }
      }
    }
  }

  return {
    part1: count1,
    part2: count2,
  };
};

const testInput = getPuzzleInputFile("04", 2024);
console.log(day4(testInput));

getPuzzleInputApi(4, 2024).then(input => {
  console.log(day4(input));
});
