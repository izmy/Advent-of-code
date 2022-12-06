import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

interface Step {
  move: number;
  from: number;
  to: number;
}

const day5 = (input: string[]) => {
  let stacks = [] as Array<string[]>;
  let steps = [] as Step[];
  for (const line of input) {
    if (line.startsWith("move")) {
      const data = line.match(/(\d[\d\.]*)/g)!.map(Number);
      if (data.length === 3) {
        const [move, from, to] = data.map(Number);
        steps.push({ move, from, to });
      }
    } else {
      let j = 0;
      for (let i = 1; i < line.length - 1; i += 4) {
        if (line[i] === " " || line[i].match(/[a-z]/i)) {
          if (stacks[j] === undefined) stacks[j] = [];
          if (line[i].match(/[a-z]/i)) stacks[j].push(line[i]);
          j++;
        }
      }
    }
  }

  stacks = stacks.map(stack => stack.reverse());
  const stacks2 = [...stacks.map(stack => [...stack])];

  for (let i = 0; i < steps.length; i++) {
    const current = stacks[steps[i].from - 1];
    const target = stacks[steps[i].to - 1];
    for (let j = 0; j < steps[i].move; j++) {
      target.push(current[current.length - 1]);
      current.pop();
    }
  }

  let part1 = "";
  for (const stack of stacks) {
    part1 += stack[stack.length - 1];
  }

  for (let i = 0; i < steps.length; i++) {
    const current = stacks2[steps[i].from - 1];
    const target = stacks2[steps[i].to - 1];
    let k = steps[i].move;

    for (let j = 0; j < steps[i].move; j++) {
      const index = current.length - k;
      target.push(current[index]);
      current.splice(index, 1);
      k--;
    }
  }

  let part2 = "";
  for (const stack of stacks2) {
    part2 += stack[stack.length - 1];
  }

  return {
    part1,
    part2,
  };
};

const testInput = getPuzzleInputFile("05", 2022);
console.log(day5(testInput));

getPuzzleInputApi(5, 2022).then(input => {
  console.log(day5(input));
});
