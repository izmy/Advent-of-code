import * as fs from "fs";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
import { HeadersInit } from "node-fetch";

dotenv.config();

export const getPuzzleInputApi = async (day: number, year: number = 2020) => {
  const result = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      Cookie: process.env.COOKIE,
    } as HeadersInit,
  });
  const input = await result.text();
  const inputInArray = await input.split("\n");

  if (input[input.length - 1] === "\n") {
    inputInArray.length = inputInArray.length - 1;
  }

  return inputInArray;
};

export const getPuzzleInputFile = (day: string, year: number = 2020) => {
  const input = fs.readFileSync(`${year}/${day}-test.txt`, "utf-8");
  const inputInArray = input.split("\n");

  if (input[input.length - 1] === "\n") {
    inputInArray.length = inputInArray.length - 1;
  }

  return inputInArray;
};
