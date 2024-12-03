import * as fs from "node:fs";
import * as dotenv from "dotenv";

dotenv.config();

export const getPuzzleInputApi = async (day: number, year = 2020) => {
  const result = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: new Headers(process.env.COOKIE ? { Cookie: process.env.COOKIE } : undefined),
  });
  const input = await result.text();
  const inputInArray = await input.split("\n");

  if (input[input.length - 1] === "\n") {
    inputInArray.length = inputInArray.length - 1;
  }

  return inputInArray;
};

export const getPuzzleInputFile = (day: string, year = 2020) => {
  const input = fs.readFileSync(`${year}/${day}-test.txt`, "utf-8");
  const inputInArray = input.split("\n");

  if (input[input.length - 1] === "\n") {
    inputInArray.length = inputInArray.length - 1;
  }

  return inputInArray;
};
