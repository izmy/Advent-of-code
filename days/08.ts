import { getPuzzleInputApi, getPuzzleInputFile } from "..";

const parseInstruction = instruction => {
  let [operation, value] = instruction.split(" ");
  let newIndex;
  switch (operation) {
    case "acc":
      value = Number(value);
      newIndex = 1;
      break;
    case "jmp":
      newIndex = Number(value);
      value = 0;
      break;
    case "nop":
      value = 0;
      newIndex = 1;
      break;
  }

  return [newIndex, value];
};

const findLoop = (input: string[]): [number, boolean] => {
  let index = 0;
  let globalValue = 0;
  const historyIndexes = [];

  while (true) {
    const [newIndex, newValue] = parseInstruction(input[index]);
    globalValue += newValue;
    index += newIndex;

    if (historyIndexes.some(historyIndex => historyIndex === index)) {
      return [globalValue, true];
    }
    historyIndexes.push(index);

    if (index === input.length) break;
  }

  return [globalValue, false];
};

const day8 = (input: string[]) => {
  const analysisCycleValue = findLoop(input)[0];
  let correctValue = 0;

  for (const [index, line] of Object.entries(input)) {
    const instruction = line.split(" ")[0];
    if (instruction !== "jmp" && instruction !== "nop") continue;

    const newInput = [...input];
    if (instruction === "jmp") {
      newInput[index] = newInput[index].replace("jmp", "nop");
    }
    if (instruction === "nop") {
      newInput[index] = newInput[index].replace("nop", "jmp");
    }

    const [result, loop] = findLoop(newInput);
    if (loop === false) {
      correctValue = result;
    }
  }

  return {
    part1: analysisCycleValue,
    part2: correctValue,
  };
};

(async () => {
  const testInput = getPuzzleInputFile("08");
  console.log(day8(testInput));

  const input = await await getPuzzleInputApi(8);
  console.log(day8(input));
})();
