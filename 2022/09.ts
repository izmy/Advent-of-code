import { getPuzzleInputApi, getPuzzleInputFile } from "../index";

type Position = "U" | "R" | "D" | "L";

class Knot {
  x: number;
  y: number;
  visited: Set<string>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.visited = new Set();
    this.visit();
  }

  move(position: Position) {
    switch (position) {
      case "L":
        this.x--;
        break;
      case "R":
        this.x++;
        break;
      case "U":
        this.y++;
        break;
      case "D":
        this.y--;
        break;
      default:
    }
  }

  visit() {
    this.visited.add(`[${this.x},${this.y}]`);
  }
}

const changeFollowedPosition = (main: Knot, followed: Knot) => {
  const distance = Math.max(Math.abs(main.x - followed.x), Math.abs(main.y - followed.y));
  if (distance > 1) {
    const directionX = main.x - followed.x;
    if (directionX > 0) {
      followed.move("R");
    } else if (directionX < 0) {
      followed.move("L");
    }
    const directionY = main.y - followed.y;
    if (directionY > 0) {
      followed.move("U");
    } else if (directionY < 0) {
      followed.move("D");
    }
  }

  main.visit();
  followed.visit();
};

const day9 = (input: string[]) => {
  const head = new Knot(0, 0);
  const tail = new Knot(0, 0);
  const knots = Array.from(Array(10), _ => new Knot(0, 0));

  for (let i = 0; i < input.length; i++) {
    const [position, steps] = input[i].split(" ") as [Position, string];

    // part1
    for (let j = 0; j < parseInt(steps); j++) {
      head.move(position);
      changeFollowedPosition(head, tail);
    }

    // part2
    for (let j = 0; j < parseInt(steps); j++) {
      knots[0].move(position);
      for (let k = 0; k < knots.length - 1; k++) {
        changeFollowedPosition(knots[k], knots[k + 1]);
      }
    }
  }

  const part1 = tail.visited.size;
  const part2 = knots.map(knot => knot.visited.size)[knots.length - 1];

  return {
    part1,
    part2,
  };
};

const testInput = getPuzzleInputFile("09", 2022);
console.log(day9(testInput));

getPuzzleInputApi(9, 2022).then(input => {
  console.log(day9(input));
});
