import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

type Position = "U" | "R" | "D" | "L";

interface Step {
  position: Position;
  size: number;
}

const moving = (x: number, y: number, position: Position): [number, number] => {
  switch (position) {
    case "L":
      return [x - 1, y];
    case "R":
      return [x + 1, y];
    case "U":
      return [x, y + 1];
    case "D":
      return [x, y - 1];
    default:
      return [x, y];
  }
};

const day9 = (input: string[]) => {
  const steps = [] as Step[];

  const moves = [{ head: [0, 0], tail: [0, 0] }];

  for (let i = 0; i < input.length; i++) {
    const [position, sizeRaw] = input[i].split(" ") as [Position, string];
    const size = parseInt(sizeRaw);
    const step = { position, size };
    steps.push(step);

    let head = moves[moves.length - 1].head;
    let tail = moves[moves.length - 1].tail;

    for (let j = 0; j < size; j++) {
      // console.log({ head, tail });
      if (head[0] < tail[0] && head[1] === tail[1]) {
        if (position === "L") {
          tail = moving(tail[0], tail[1], position);
        }
      } else if (head[0] > tail[0] && head[1] === tail[1]) {
        if (position === "R") {
          tail = moving(tail[0], tail[1], position);
        }
      } else if (head[0] === tail[0] && head[1] < tail[1]) {
        if (position === "D") {
          tail = moving(tail[0], tail[1], position);
        }
      } else if (head[0] === tail[0] && head[1] > tail[1]) {
        if (position === "U") {
          tail = moving(tail[0], tail[1], position);
        }
      } else if (head[0] === tail[0] && head[1] === tail[1]) {
      } else if (head[0] > tail[0] && head[1] > tail[1]) {
        if (position === "U" || position === "R") {
          tail = moving(tail[0], tail[1], "U");
          tail = moving(tail[0], tail[1], "R");
        }
      } else if (head[0] > tail[0] && head[1] < tail[1]) {
        if (position === "D" || position === "R") {
          tail = moving(tail[0], tail[1], "D");
          tail = moving(tail[0], tail[1], "R");
        }
      } else if (head[0] < tail[0] && head[1] > tail[1]) {
        if (position === "L" || position === "U") {
          tail = moving(tail[0], tail[1], "U");
          tail = moving(tail[0], tail[1], "L");
        }
      } else if (head[0] < tail[0] && head[1] < tail[1]) {
        if (position === "L" || position === "D") {
          tail = moving(tail[0], tail[1], "D");
          tail = moving(tail[0], tail[1], "L");
        }
      }

      head = moving(head[0], head[1], position);
      moves.push({ head, tail });
    }
  }

  console.log(moves);
  const part1 = new Set(moves.map(move => move.tail.toString())).size;

  return {
    part1,
    part2: null,
  };
};

const testInput = getPuzzleInputFile("09", 2022);
console.log(day9(testInput));

getPuzzleInputApi(9, 2022).then(input => {
  console.log(day9(input));
});
