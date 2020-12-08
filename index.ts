import * as fs from "fs";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

export const getPuzzleInputApi = async (day: number) => {
  const result = await fetch(`https://adventofcode.com/2020/day/${day}/input`, {
    headers: {
      Cookie: process.env.COOKIE,
    },
  });
  const input = await result.text();
  const inputInArray = await input.split("\n");

  if (input[input.length - 1] === "\n") {
    inputInArray.length = inputInArray.length - 1;
  }

  return inputInArray;
};

export const getPuzzleInputFile = (day: string) => {
  const input = fs.readFileSync(`days/${day}-test.txt`, "utf-8");
  const inputInArray = input.split("\n");

  if (input[input.length - 1] === "\n") {
    inputInArray.length = inputInArray.length - 1;
  }

  return inputInArray;
};
